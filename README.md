# Event Feedback Hub

## Running the project

1. Install dependencies with npm at the root of the project.
   ```bash
   npm install
   ```
2. Run the DB migrations with the following command in the _apps/api_ directory.
   ```bash
   # cd apps/api
   npx prisma migrate reset
   ```
3. Generate prisma client files.
   ```bash
   # cd apps/api
   npx prisma generate
   ```
4. Run both the frontend and backend with the following command at the root of the project.
   ```bash
   # cd ../..
   npm run dev
   ```
5. Visit the app at [http://localhost:5173](http://localhost:5173)
