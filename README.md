# Tech Choices

- I've implemented my solution in Typescript as it has considerably less boilerplate/setup than creating a new Java application. The can be seen in how the core code required to listen to packets on port 8282 takes only a handful of lines. In a production application, Java might actually be the better choice, but given this was something I needed to be able to spin up fairly quickly, I went with Node.
- The first thing the application does when starting is reachout to the /types endpoint to get the latest schema. It then uses this as a reference to transform the packets into JSON as they are received. In theory, if the schema changed, the service could be restarted to retreive the latest version from /types.
- Message parsing logic has been split into its own module, and is unit tested to a reasonable level. Initially, the parser replaces escaped pipes with @@@ (this was chosen as it seemed an unlikely character string to crop up naturally). It then splits the string into an array using the remaining pipes as a delimiter, then replaces the escaped pipes.
- Writing to the database has also been split into its own module. Due to time constraints, this code is only semi functional. Writing events, and to some extent markets, works correctly, but the code struggles to handle the load of the data stream, as there is no way in this implementation to enforce an ordering in which messages are applied to the database. This means that while the code for writing outcomes does technically work, it requires you to get lucky to see it, as most of the time the market for which outcomes are targeting has not been applied correctly. 
- Had I more time, I would've split the receipt and writing of messages into two applications, bridged by one of the message brokers. I could then have used this to prevent any messages from being lost, and better enforced an ordering of writes to the database (this relies on Rabbit/Kafka letting me pull the message with the lowest messageId/sorting by messageId. As I've never used either I don't know how possible this is).

# Running the solution

1. Make sure dependencies are installed by running `npm install`
2. Make sure everything is compiled into typescript by running `npx tsc`
3. Unit tests can be run with `npm test`
4. The solution can be run with `npm start`
5. Note that you'll need to run `docker-compose up` first to ensure the producer/database are running