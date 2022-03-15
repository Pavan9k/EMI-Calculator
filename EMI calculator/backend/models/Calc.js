import mongoose from 'mongoose';
const {Schema} = mongoose
import bcrypt from 'bcrypt';


const calcSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    emi: {
        type: String,
        required: 'emi is required',
    },
    totalInterest: {
        type: String,
        required: 'total interest is required',

    },
    totalAmount: {
        type: String,
        required: 'total amount is required',

    },
},

{timestamps: true}
);

export default mongoose.model('Calcs', calcSchema);