import mongoose from "mongoose";
const Schema = mongoose.Schema;

const attendeeModel = new Schema(
  {
    attendeeID: { type: String, required: true },
    attendeeEmail: { type: String, required: true, unique: true },
    attendeeFirstName: { type: String, required: true },
    attendeeLastName: { type: String, required: true },
    attendeeOrg: { type: String, required: false },
    attendeeExperience: { type: String, required: false },
    attendeeLearning: { type: String, required: false },
    refferalCode: { type: String, required: false },
    refferedBy: { type: String, required: false },
    refferalCount: { type: Number, required: false, default: 0 },
  },
  {
    timestamps: true,
  }
);
exports.orgs = attendeeModel;
export default mongoose.model("attendees", attendeeModel);
