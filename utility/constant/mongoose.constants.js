const mongoose = require('mongoose');

const mongooseConstnts = {
    requiredString: {
        type: String,
        required: true,
    },
    optionalString: {
        type: String,
    },
    requiredNumber: {
        type: Number,
        required: true,
    },
    optionalNumber: {
        type: Number,
    },
    requiredDate: {
        type: Date,
        required: true,
    },
    optionalDate: {
        type: Date,
    },
    requiredBoolean: {
        type: Boolean,
        required: true,
    },
    optionalBoolean: {
        type: Boolean,
    },
    requiredMongooseObjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    optionalMongooseObjectId: {
        type: mongoose.Schema.Types.ObjectId,
        
    },
    uniqueLowercaseTrimmed: {
        lowercase: true,
        trim: true,
        unique: true,
    },
};

module.exports = mongooseConstnts;
