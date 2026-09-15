# Metacad Dashboard

## Quickstart 
### With hosted API
1. Copy `.env.example` to `.env.local`
2. Set `NEXT_PUBLIC_API_BASE_URL` to API address
3. Run `npm install` to install node modules
4. Run `npm run dev` to start the app at `localhost:3000`

### Without hosted API
1. Create main folder e.g. `metacad`
2. Copy this directory into this folder
3. Clone [metacad-api](https://github.com/atrium-research/metacat-api) into 
folder created in 1st point, and follw `Quickstart` steps from its readme file
4. Back in fronted folder:
     - copy `.env.example` to `.env.local`
     - set `NEXT_PUBLIC_API_BASE_URL` to local API address
     - run `npm install` to install node modules
     - run `npm run dev` to start the app at `localhost:3000`