const { z } = require("zod");

const assignAgentSchema = z.object({
  parcelId: z.string().length(24),
  agentId: z.string().length(24)
});

module.exports = { assignAgentSchema };
