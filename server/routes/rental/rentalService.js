const { Rental, Log, Tool, Img,Sequelize,User } = require('../../models');
const { Op } = require('sequelize');
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const schedule = require('node-schedule');
const { resolve } = require('path');
// update at 00:00
/*schedule.scheduleJob({ hour: 0, minute: 1 }, () => {
    const currentTime = moment().format("YYYY-MM-DD");

    Rental.findAll({
        where: {
            rental_state: "대여",
            rental_due_date: {
                [Op.lt]: currentTime
            }
        },
        attributes: ['rental_id']
    })
        .then((result) => {
            console.log(result)

            for (let i = 0; i < result.length; i++) {
                Rental.update({
                    rental_state: "미반납"
                },
                    {
                        where: { rental_id: result[i].rental_id }
                    })
            }
        })
        .catch(err => {
            console.log(err);
        })
        .catch(err => {
            console.log(err);
        })
})*/

module.exports = {
    rentalTool: (body) => {
        return new Promise((resolve) => {
            Tool.findOne({
                where: { tool_id: body.tool_id }
            })
                .then((result) => {
                    console.log(result.tool_state)
                    if (result.tool_state == "대여불가") {
                        resolve("대여불가")
                    }
                    else if (result.tool_state == "대여가능") {
                        const dueDate = moment().add(7, 'days');
                        // create rentalDB
                        Rental.create({
                            tool_id: body.tool_id,
                            user_id: body.user_id,
                            rental_date: moment().format("YYYY-MM-DD"), // now
                            rental_due_date: dueDate.format("YYYY-MM-DD"),
                            rental_state: "대여",
                            rental_extend: false,
                            rental_reason: body.rental_reason,

                        })
                            .then((createResult) => {
                                console.log(createResult)
                                // LOG DB 생성
                                Log.create({
                                    log_type: "0",
                                    log_title: "대여",
                                    log_content: `${createResult.user_id}님께서 ${createResult.tool_id} 기자재를 대여했습니다. `,
                                    log_create_at: createResult.rental_date,
                                    department_id: body.department_id
                                })
                                    .then((logResult) => {
                                        // change tool_state "대여가능" to "대여중"
                                        Tool.update({
                                            tool_state: "대여중"
                                        },
                                            { where: { tool_id: createResult.tool_id }, }
                                        )
                                            .then((updateResult) => {
                                                console.log(createResult.rental_id)
                                                console.log("******update OK*******");
                                                updateResult !== null ? resolve(logResult.log_content) : resolve("err");

                                            })
                                            .catch((err) => {
                                                console.log(err);
                                                resolve("err");
                                            });
                                        console.log("create Log");
                                        console.log(logResult);
                                    })
                                    .catch((err) => {
                                        console.log("create Log failed");
                                        console.log(err);
                                        resolve("err");
                                    });
                            })
                            .catch((err) => {
                                console.log(err);
                                resolve("err");
                            });
                    } else { // the tool has already been rentaled
                        resolve("err");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        })
    },

    rentalClassRoom: (body) => {
        return new Promise((resolve) => {
            const requiredFields = ["tool_id", "user_id", "rental_date", "rental_due_date", "department_id"];

            for (const field of requiredFields) {
                if (!(field in body) || body[field] === undefined || body[field] === null) {
                    const fieldResult = field;
                    //console.log(fieldResult)
                    resolve(fieldResult);
                    return;
                }
            }


            const a = moment(body.rental_date)
            const b = moment(body.rental_due_date)


            const rentalDate = a.add(9, 'hours');
            const rentalDueDate = b.add(9, 'hours');

            Rental.create({
                tool_id: body.tool_id,
                user_id: body.user_id,
                rental_date: rentalDate,
                rental_due_date: rentalDueDate,
                rental_state: "대여",
                rental_extend: false,
                rental_reason: body.rental_reason
            })
                .then((createResult) => {
                   //console.log(createResult)
                    Log.create({
                        log_type: "0",
                        log_title: "대여",
                        log_content: `${createResult.user_id}님께서 ${createResult.tool_id} 기자재를 대여했습니다.`,
                        log_create_at: moment(createResult.rental_date),
                        department_id: body.department_id
                    })
                        .then((result) => {
                            
                            resolve(result); // 성공적으로 처리되었으므로 resolve() 호출
                        })
                        .catch((logError) => {
                            console.error("로그 생성 오류:", logError);
                            resolve("로그 생성 오류"); // 오류 처리 후 resolve()
                        });
                })
                .catch((error) => {
                    console.error("대여 생성 오류:", error);
                    resolve("대여 생성 오류"); // 오류 처리 후 resolve()
                });
        });
    },

    returnClassRoom: (body)=>{
      return new Promise((resolve)=>{
        Rental.update({
            rental_state:"반납"
        },
        {
            where:{
                rental_id:body.rental_id,
                user_id:body.user_id,
                tool_id:body.tool_id
            },
            returning: true, // 수정된 열 정보 반환을 활성화합니다.
            plain: true // 수정된 결과를 플레인 객체로 반환합니다.
        }
        )
        .then((result)=>{
           
            Log.create({
                log_type: 1,
                log_title: "반납",
                log_content: `${body.tool_id} 강의실이 반납되었습니다. `,
                log_create_at: moment().format("YYYY-MM-DD"),
            })
            .then((logResult)=>{
                resolve(logResult)
            })
            .catch((err)=>{
                console.log(err)
                resolve("err")
            })
        })
        .catch((err)=>{
            console.log(err)
            resolve("err")
        })
      })
    },

    NotClassCount: (toolId) => {
        return new Promise((resolve) => {
          Rental.findAll({
            where: {
              rental_state: "대여",
              [Sequelize.Op.and]: [
                { tool_id: { [Sequelize.Op.eq]: toolId } }
              ]
            },
            include: [
                {
                    model:User,
                    attributes: ['user_name'],
                },
            ]
           

          })
          .then((result) => {
            result !== null ? resolve(result) : resolve(false);
          })
          .catch((err) => {
            resolve("err");
          });
        });
    },
      
    returnTool: (body) => {
        return new Promise((resolve) => {
            Tool.findOne({
                include: [
                    {
                        model: Rental,
                        attributes: ['user_id']
                    },

                ],
                where: { tool_id: body.tool_id }
            },

            )
                .then((result) => {
                    if (result == null) {
                        resolve("null")
                    }
                    else if (result.tool_state == "대여중") {
                        // change rental_state "대여" to "반납"
                        Rental.update({
                            rental_state: "반납"
                        },
                            {
                                where: {
                                    tool_id: result.tool_id,
                                    rental_state: "대여"
                                }
                            })
                            .then(() => {
                                // LOG DB 생성
                                console.log(result);
                                Log.create({
                                    log_type: 1,
                                    log_title: "반납",
                                    log_content: `${result.tool_id} 기자재가 반납되었습니다. `,
                                    log_create_at: moment().format("YYYY-MM-DD"),
                                    department_id: result.department_id
                                })
                                    .then((logResult) => {
                                        // change tool_state "대여중" to "대여가능"
                                        Tool.update({
                                            tool_state: "대여가능"
                                        },
                                            { where: { tool_id: result.tool_id }, }
                                        )
                                            .then((toolUpdateResult) => {
                                                toolUpdateResult !== null ? resolve(logResult.log_content) : resolve("err");

                                            })
                                            .catch((err) => {
                                                console.log(err);
                                                resolve("err");
                                            });

                                    })
                                    .catch((err) => {
                                        console.log("create Log failed");
                                        console.log(err);
                                        resolve("err");
                                    });

                            })
                            .catch((err) => {
                                console.log(err);
                                resolve("err");
                            });
                    } else {
                        resolve("extension");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    resolve("err");
                });
        })
    },

    extensionTool: (body) => {
        return new Promise((resolve) => {
            Rental.findOne({
                where: { tool_id: body.tool_id }
            })
                .then((result) => {
                    if (result.rental_extend == true) {
                        resolve("extension");
                    } else {
                        const dueDate = moment(result.rental_due_date).add(7, 'days');
                        Rental.update({
                            rental_due_date: dueDate,
                            rental_extend: true
                        }, { where: { rental_id: result.rental_id } })
                            .then(() => {
                                Log.create({
                                    log_type: 2,
                                    log_title: "연장",
                                    log_content: `${result.user_id}님께서 ${result.tool_id} 기자재 반납 기간을 ${dueDate}까지 연장했습니다.`,
                                    log_create_at: moment().format("YYYY-MM-DD"),
                                    department_id: result.department_id
                                })
                                    .then((logResult) => {
                                        resolve(logResult.log_content);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        resolve("err");
                                    });
                            })
                            .catch((err) => {
                                console.log(err);
                                resolve("err");
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    },

    myRentalList: (userId,page,pageLimit) => {
        page = parseInt(page);
        pageLimit = parseInt(pageLimit);
        const pageOffset = (page - 1) * pageLimit;
        return new Promise((resolve) => {
            Rental.findAll({
                where: {
                    user_id: userId,
                    rental_state: "대여" // "대여" 상태인 레코드만 조회
                },
                limit: pageLimit,
                offset: pageOffset,
                include: [
                    {
                        model: Tool,
                        attributes: ['tool_content', "tool_state", "tool_name"] // 'Tool' 테이블에서 불러올 컬럼 지정
                    },
                ]
            })
                .then((result) => {
                    let total = result.length
                    console.log(total)
                    let objs = [];

                    //let days;
                    let Dday;

                    for (i = 0; i < result.length; i++) {

                        let obj = {};

                        //days = moment(result[i].rental_due_date).diff(moment(), 'days');
                        let days = moment().diff(moment(result[i].rental_due_date), 'days');

                        if (days > 0) {
                            Dday = "D - " + days;
                        } else if (days == 0) {
                            Dday = "TODAY"
                        } else {
                            Dday = "미반납"
                        }

                        obj['D_day'] = Dday;
                        obj['result'] = result[i];

                        objs.push(obj);

                    }

                    result !== null ? resolve({total,objs}) : resolve(false);

                })
                .catch((err) => {
                    console.log(err);
                    resolve("err");
                });
        });
    },

    myAllRentalList: (userId,page,pageLimit) => {
        page = parseInt(page);
        pageLimit = parseInt(pageLimit);
        const pageOffset = (page - 1) * pageLimit;
        return new Promise((resolve) => {
            Rental.findAll({
                where: {
                    user_id: userId,
                    rental_state: { [Op.or]: ["대여", "반납"] } // "대여" 상태인 레코드만 조회
                },
                limit: pageLimit,
                offset: pageOffset,
                include: [
                    {
                        model: Tool,
                        attributes: ['tool_content', "tool_state", "tool_name"] // 'Tool' 테이블에서 불러올 컬럼 지정
                    },
                ]
            })
                .then((result) => {
                    let total = result.length
                    resolve({result,total});
                })
                .catch((err) => {
                    console.log(err);
                    resolve("err");
                });
        });
    },

    myLateRentalList: (userId) => {
        return new Promise((resolve) => {
            Rental.findAll({
                where: {
                    user_id: userId,
                    rental_state: "미반납" // "미반납" 상태인 레코드만 조회
                },
                include: [
                    {
                        model: Tool,
                        attributes: ['tool_content', 'tool_state', 'tool_name'] // 'Tool' 테이블에서 불러올 컬럼 지정
                    },
                    {
                        model: User,
                        attributes: ['user_name']
                    }
                ]
            })
                .then((result) => {
                    let objs = [];

                    for (let i = 0; i < result.length; i++) {
                        let obj = {};
                        let days = moment().diff(moment(result[i].rental_due_date), 'days');

                        obj['D_day'] = "D+" + days; // 연체 일수 계산하여 "D+일수" 형태로 저장
                        obj['result'] = result[i];

                        objs.push(obj);
                    }

                    resolve(objs);
                })
                .catch((err) => {
                    console.log(err);
                    resolve("err");
                });
        })
    },

    LateRentalList: () => {
        return new Promise((resolve) => {
            Rental.findAll({
                where: {
                    rental_state: "미반납" // "미반납" 상태인 레코드만 조회
                },
                include: [
                    {
                        model: Tool,
                        attributes: ['tool_content', 'tool_state', 'tool_name'] // 'Tool' 테이블에서 불러올 컬럼 지정
                    }
                ]
            })
                .then((result) => {
                    let objs = [];

                    for (let i = 0; i < result.length; i++) {
                        let obj = {};
                        let days = moment().diff(moment(result[i].rental_due_date), 'days');

                        obj['D_day'] = "D+" + days; // 연체 일수 계산하여 "D+일수" 형태로 저장
                        obj['result'] = result[i];


                        objs.push(obj);
                    }

                    resolve(objs);
                })
                .catch((err) => {
                    console.log(err);
                    resolve("err");
                });
        })
    },

    rentalTableAll: () => {
        return new Promise((resolve) => {
            Rental.findAll(

            )
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    resolve("err")
                })

        })
    },

    rentalToolList: () => {
        return new Promise((resolve) => {
            Rental.findAll({
                where: { rental_state: "대여" },
                //   include: [
                //     {
                //         model: Rental,
                //         attributes: ['user_id', 'tool_id',] 
                //     }
                // ]
            })
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    console.log(err)
                    resolve("err")
                })
        })
    },

    ViewRental: (departmentId) => {
        return new Promise((resolve) => {
          Tool.findAll({
            where: {
              tool_state: "대여중",
              department_id: departmentId,
            },
            include: [
                {
                  model: Rental,
                  attributes: ['user_id'],
                  include: [
                    {
                      model: User, // User 모델과 조인
                      attributes: ['user_name'], // 필요한 속성 선택
                    },
                  ],
                },
              ],
            })
            .then((result) => {
              resolve(result);
            })
            .catch((err) => {
              resolve('err');
            });
        });
    },

    ViewClassRoom: (toolId)=>{
        return new Promise((resolve)=>{
            Rental.findAll({
                where:{
                    rental_state:"대여",
                    tool_id:toolId,
                }
            })
            .then((result) => {
                resolve(result);
              })
              .catch((err) => {
                resolve('err');
              });
        })
    },


     /*  LateRentalList: (res) => {
           return new Promise((resolve) => {
             Rental.findAll({
               where: {
                 rental_state: "미반납" // "미반납" 상태인 레코드만 조회
               },
               include: [
                 {
                   model: Tool,
                   attributes: ['tool_content', 'tool_state', 'tool_name'], // 'Tool' 테이블에서 불러올 컬럼 지정
                 }
               ]
             })
               .then((result) => {
                 let objs = {};
         
                 for (let i = 0; i < result.length; i++) {
                   let days = moment().diff(moment(result[i].rental_due_date), 'days');
                   let obj = {};
         
                   obj['D_day'] = "D+" + days; // 연체 일수 계산하여 "D+일수" 형태로 저장
                   obj['result'] = result[i];
         
                   // tool_id를 key로 사용하여 객체에 저장
                   objs[result[i].tool_id] = obj;
                 }
         
                 resolve(objs);
               })
               .catch((err) => {
                 console.log(err);
                 resolve("err");
               });
           });
         }, */

}