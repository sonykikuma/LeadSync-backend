const Lead = require("./models/Lead"); // Adjust the path if needed

const updateLeadStatuses = async () => {
  try {
    const now = new Date();

    // Find leads that are not closed
    const leadsToUpdate = await Lead.find({ status: { $ne: "Closed" } });

    for (let lead of leadsToUpdate) {
      const closedAt = new Date(lead.createdAt);
      closedAt.setDate(closedAt.getDate() + lead.timeToClose);

      if (closedAt <= now) {
        lead.status = "Closed";
        await lead.save();
        console.log(`✅ Lead ${lead._id} marked as Closed.`);
      }
    }
  } catch (err) {
    console.error("❌ Error updating lead statuses:", err);
  }
};

updateLeadStatuses();
setInterval(updateLeadStatuses, 60 * 60 * 1000); // Runs every 1 hour

module.exports = updateLeadStatuses;
