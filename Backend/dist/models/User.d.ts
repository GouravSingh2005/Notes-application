import mongoose from "mongoose";
export declare const User: mongoose.Model<{
    email: string;
    username: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    email: string;
    username: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    email: string;
    username: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    username: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email: string;
    username: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    email: string;
    username: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=User.d.ts.map