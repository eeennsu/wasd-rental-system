import { createWithEqualityFn } from 'zustand/traditional';
import { devtools } from 'zustand/middleware';
import { ISearchStore } from './types';

const useSearchStore = createWithEqualityFn<ISearchStore>()(
    devtools(
        (set) => ({
            searchTerm: '',
            setSearchTerm: (searchTerm) => set(() => ({ searchTerm }), false, 'SET_SEARCH_TERM'),

            searchedResults: null,
            setSearchedResults: (searchedResults) => set(() => ({ searchedResults }), false, 'SET_SEARCHED_RESULTS')

            // searchedVRs: null,
            // setSearchedVRs: (searchedVRs) => set(() => ({ searchedVRs }), false, 'SET_SEARCHED_VRS'),

            // searchedTablets: null,
            // setSearchedTablets: (searchedTablets) => set(() => ({ searchedTablets }), false, 'SET_SEARCHED_TABLETS'),

            // searchedLectureRooms: null,
            // setSearchedLectureRooms: (searchedLectureRooms) => set(() => ({ searchedLectureRooms }), false, 'SET_SEARCHED_LECTURE_ROOMS'),

            // searchedResults: [],
            // setSearchedResults: (results) => set(() => ({ searchedResults: results }), false ,'SET_SEARCHED_RESULTS'),
        }),
    )
);

export default useSearchStore;