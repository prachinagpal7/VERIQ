import mongoose from "mongoose";

const hiddenTestCaseSchema = new mongoose.Schema(
  {
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
      index: true,
    },
    slug: {
      // kept alongside `problem` so seed scripts can match hiddenTestCases.js
      // entries to the right problem before/without knowing its ObjectId
      type: String,
      required: true,
    },
    testCases:[{
            input:{
                type:String,
                required:true
            },
            expectedOutput:{
                type:String,
                required:true
            }
        }]
  },
  { timestamps: true }
);

hiddenTestCaseSchema.index({ problem: 1, order: 1 });

const HiddenTestCase = mongoose.model("HiddenTestCase", hiddenTestCaseSchema);

export default HiddenTestCase;