const { resolve } = require('path');
const {
  Tool, Img, Department, Rental, User, Sequelize: { Op }
} = require('../../models');
const moment = require("moment");
const e = require('express');
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

module.exports = {
  addTool: (body, img) => {
    return new Promise((resolve) => {
      if (img == undefined) {
        console.log("이거동작하니?")
        resolve("img undefined");
      } else if (
        !body.tool_id ||
        !body.tool_division ||
        !body.tool_code ||
        !body.tool_name ||
        !body.tool_standard ||
        !body.tool_purchase_division ||
        !body.department_id ||
        !body.tool_content ||
        !body.tool_spec
      ) {
        resolve("Value Null");
      } else {
        Tool.findOrCreate({
          where: {
            [Op.or]: [
              { tool_id: body.tool_id }
            ]
          },
          defaults: {
            tool_id: body.tool_id,
            tool_division: body.tool_division,
            tool_code: body.tool_code,
            tool_name: body.tool_name,
            tool_purchase_division: body.tool_purchase_division,
            tool_purchase_date: moment().format("YYYY-MM-DD"),
            tool_standard: body.tool_standard,
            tool_update_at: moment().format("YYYY-MM-DD"),
            tool_state: "대여가능",
            department_id: body.department_id,
            tool_content: body.tool_content,
            tool_spec: body.tool_spec

          }
        })
          .then(async (result) => {
            if (!result[1]) {
              // 이미 존재하는 레코드라면 "EXIST"를 반환
              resolve("EXIST");
            } else {
              let obj = { result: result[0] };
              let results = [];
              console.log(obj.result.tool_id)
              if (img != undefined) {
                const imgUrl = decodeURIComponent(img.path)
                await Img.create({
                  img_id: obj.result.tool_id,
                  img_url: imgUrl,
                  tool_id: body.tool_id,
                })
                  .then((imgResult) => {
                    results.push(imgResult);
                    obj.image = results;
                    resolve(obj);
                  })
                  .catch((err) => {
                    console.log(err);
                    resolve(false); // 오류가 발생하면 false를 반환
                  });
              } else {
                resolve(obj);
              }
            }
          })
          .catch((err) => {
            console.log(err);
            resolve(false); // 오류가 발생하면 false를 반환
          });
      }
    });
  },

  
    
  updateTool: async (body, img) => {
  return new Promise(async (resolve) => {
    try {
      const toolId = body.tool_id;
      const updateFields = {};

      if (img && Object.keys(body).length === 1) {
        // 1. 이미지만 수정
        console.log("1번이찍힘");
        const imgResult = await Img.update(
          { img_url: img.path },
          { where: { tool_id: toolId } }
        );
        resolve(imgResult);
      } else if (!img && body) {
        console.log("2번이찍힘");
        // 2. 내용만 수정
        const keys = Object.keys(body);
        const values = Object.values(body);

        if (keys.length === 0) {
          resolve("Null");
        }

        for (let i = 0; i < keys.length; i++) {
          updateFields[keys[i]] = values[i];
        }

        const toolResult = await Tool.update(updateFields, {
          where: { tool_id: toolId }
        });

        if (toolResult[0] === 0) {
          resolve("Tool not found");
        } else {
          resolve(toolResult);
        }
      } else if (img && body) {
        console.log("3번이찍힘");
        // 3. 이미지와 내용 모두 수정
        const keys = Object.keys(body);
        const values = Object.values(body);

        for (let i = 0; i < keys.length; i++) {
          updateFields[keys[i]] = values[i];
        }

        if (keys.length === 0) {
          resolve("Null");
        }

        const toolResult = await Tool.update(updateFields, {
          where: { tool_id: toolId }
        });

        if (toolResult[0] === 0) {
          resolve("Tool not found");
        } else {
          const imgResult = await Img.update(
            { img_url: img.path },
            { where: { tool_id: toolId } }
          );

          if (imgResult[0] === 0) {
            resolve("Image not found");
          } else {
            resolve(imgResult);
          }
        }
      }
    } catch (err) {
      console.error(err);
      resolve("Error updating tool or image");
    }
  });
},

  viewTool: (toolId) => {
    return new Promise(async (resolve) => {
      try {
        const [toolResult, imgResult] = await Promise.all([
          Tool.findOne({ where: { tool_id: toolId } }),
          Img.findOne({ where: { tool_id: toolId } })
        ]);
  
        if (toolResult && imgResult) {
          const combinedResult = {
            tool: toolResult,
            img: imgResult
          };
          resolve(combinedResult);
        } else {
          resolve(false);
        }
      } catch (error) {
        console.error(error);
        resolve("err");
      }
    });
  },

  viewTools: (page, pageLimit, toolName) => {
    const pageOffset =parseInt((page - 1) * pageLimit);
    const searchCondition = {
      where: {},
      limit: pageLimit,
      offset: pageOffset,
    };
  
    if (toolName !== null) {
      searchCondition.where[Op.or] = [
        { tool_id: { [Op.like]: "%" + toolName + "%" } },
        // 추가적인 검색 조건을 필요에 따라 더 추가할 수 있습니다.
      ];
    }
  
    return new Promise((resolve) => {
      Tool.findAll(searchCondition)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
           console.error('데이터 조회 중 오류 발생:', error);
          resolve(false);
        });
    });
  },
  

  deleteTool: (toolId) => {
    return new Promise(async (resolve) => {
      try {
        const [toolResult, imgResult] = await Promise.all([
          Tool.destroy({ where: { tool_id: toolId } }),
          Img.destroy({ where: { img_id: toolId } })
        ]);
  
        if (toolResult !== null && imgResult !== null) {
          const combinedResult = {
            tool: toolResult,
            img: imgResult
          };
          console.log(combinedResult)
          resolve(combinedResult);
        } else {
          resolve(false);
        }
      } catch (error) {
        console.error(error);
        resolve("err");
      }
    });
  },
}