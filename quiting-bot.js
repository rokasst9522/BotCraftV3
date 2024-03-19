const mineflayer = require('mineflayer');

const botArgs = {
    host: 'mc.craftmc.lt',
    port: '25565',
    username: "Atoi",
    version: '1.16.5'
};

const initBot = () => {

    // Setup bot connection
    let bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        let botSocket = bot._client.socket;
        console.log(`Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`);
    });

    bot.on('end', () => {
        console.log(`Disconnected`);

        // Attempt to reconnect
        setTimeout(initBot, 5000);
    });

    bot.on('spawn', async () => {
        console.log("Spawned in");
        bot.chat("/login kelmas");

        await bot.waitForTicks(60);
        bot.chat("/m pijus_kelmutis ON");
        // bot.quit();
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log(`Failed to connect to ${err.address}:${err.port}`)
        }
        else {
            console.log(`Unhandled error: ${err}`);
        }
    });
};

initBot();