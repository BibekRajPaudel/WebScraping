const mongoose = require('mongoose');

const { Schema } = mongoose;
const { optionalString } = require('../constants.js/mongoose.constant');

const gateSchema = new Schema(
    {
        terminal: {
            ...optionalString,
            enum: ['LA', 'NY'],
        },
        data: [
            {
                type: mongoose.SchemaTypes.Mixed,
                required: true,
            },
        ],
        createdTime: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

const GateModel = mongoose.model(`Gate`, gateSchema);
module.exports = GateModel;
