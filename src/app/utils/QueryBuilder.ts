//query builder 

import { Query } from "mongoose";
import { excludedFields } from "../constants";

export class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;


    public readonly query: Record<string, string>

    constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
        this.modelQuery = modelQuery;
        this.query = query
    }
    filter(): this {
        const filter = { ...this.query }

        for (const field of excludedFields) {
            delete filter[field]
        }

        this.modelQuery = this.modelQuery.find(filter)

        return this;
    }

    search(searchableField: string[]): this {
        const searchTerm = this.query.searchTerm || ""
        const searchQuery = {
            $or: searchableField.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))
        }
        this.modelQuery = this.modelQuery.find(searchQuery)
        return this
    }

    sort(): this {

        const sort = this.query.sort || "-createdAt";

        this.modelQuery = this.modelQuery.sort(sort)

        return this;
    }
    fields(): this {

        const fields = this.query.fields?.split(",").join(" ") || ""

        this.modelQuery = this.modelQuery.select(fields)

        return this;
    }
    dateSearch(): this {

        const dateSearch = this.query.dateSearch

        if (!dateSearch) {
            return this
        }

        const parsedDate = new Date(dateSearch)

        if (Number.isNaN(parsedDate.getTime())) {
            return this
        }

        const startOfDay = new Date(parsedDate)
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date(parsedDate)
        endOfDay.setHours(23, 59, 59, 999)

        this.modelQuery = this.modelQuery.find({
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        })

        return this
    }
    paginate(): this {

        const page = Number(this.query.page) || 1
        const limit = Number(this.query.limit) || 10
        const skip = (page - 1) * limit

        this.modelQuery = this.modelQuery.skip(skip).limit(limit)

        return this;
    }
    build() {
        return this.modelQuery
    }


    async getMeta() {

        const totalDocuments = await this.modelQuery.model.countDocuments()

        const page = Number(this.query.page) || 1
        const limit = Number(this.query.limit) || 10

        const totalPage = Math.ceil(totalDocuments / limit)

        return { page, limit, total: totalDocuments, totalPage }
    }

}
