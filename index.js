const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bel2017:ghjrjk2017@cluster0.xepz1rt.mongodb.net/Cluster0?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


{
  update_id: 485856767,
  callback_query: {
    id: '1020766633380759939',
    from: {
      id: 237665752,
      is_bot: false,
      first_name: 'Александр',
      last_name: 'Табаков',
      username: 'Duke1917plus100',
      language_code: 'ru'
    },
    message: {
      message_id: 42,
      from: [Object],
      chat: [Object],
      date: 1688061501,
      text: 'Пить будешь?',
      reply_markup: [Object]
    },
    chat_instance: '9095853181711582183',
    data: 'no'
  }
}