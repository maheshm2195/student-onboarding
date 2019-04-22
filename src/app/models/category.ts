import { Document } from './document'

export class Category {
    constructor(
        public id: number,
        public name: string,
        public documents: Document[]
        ) {
    }
}