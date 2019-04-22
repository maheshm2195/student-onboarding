import {Category} from './category'

export class Student {
    constructor(
        public id: number,
        public name: string,
        public categories: string,
        public documents: boolean[],
        public dob: Date,
        public fatherName: string,
        public motherName: string,
        public lastClassScore: number) {
    }
}