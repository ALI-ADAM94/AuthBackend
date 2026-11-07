AUTHPro - TypeScript Backend Setup Commands
===============================================

Project path:
D:\backend projects\authpro

1. Open the project
-------------------
cd "D:\backend projects\authpro"


2. Remove old installation
--------------------------
PowerShell:

Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

If package-lock.json does not exist, continue.


3. Install TypeScript
---------------------
npm install -D typescript@6.0.3


4. Install required TypeScript tools
------------------------------------
npm install -D @types/node@26.1.1 ts-node@10.9.2 ts-node-dev@2.0.0 tsx@4.23.1

npm i -D typescript ts-node-dev @types/node @types/express @types/bcrypt @types/jsonwebtoken
5. Install Express
------------------
npm install express

npm install -D @types/express


6. Create tsconfig.json
-----------------------
npx tsc --init

Replace tsconfig.json with:

{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "Node",

    "rootDir": "./src",
    "outDir": "./dist",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,

    "types": ["node"],

    "sourceMap": true,
    "declaration": true,

    "forceConsistentCasingInFileNames": true
  },

  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}


7. Create source folder
-----------------------
mkdir src

Create:

src\server.ts


8. server.ts
------------
Use:

import express from "express";

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.json({
    message: "AuthPro API is running"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


9. package.json scripts
-----------------------
Add/update:

"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "dev:tsx": "tsx watch src/server.ts",
   "dev": "ts-node-dev --respawn --transpile-only src/app.ts", !!--- most important ---!!
  "build": "tsc",
  "start": "node dist/server.js",
  "typecheck": "tsc --noEmit"
}

IMPORTANT:
Do NOT add:

"type": "module"

This setup uses CommonJS.


10. Check installed versions
----------------------------
npm list typescript ts-node ts-node-dev tsx @types/node


11. Check TypeScript
--------------------
npm run typecheck


12. Start development server
----------------------------
npm run dev

Expected:

Server running on http://localhost:5000


13. Test in browser
-------------------
Open:

http://localhost:5000

Expected response:

{
  "message": "AuthPro API is running"
}


14. Build production version
----------------------------
npm run build


15. Start production version
--------------------------------
npm start


16. Alternative development runner
----------------------------------
If you want to use tsx instead of ts-node-dev:

npm run dev:tsx


17. Final project structure
---------------------------

authpro/
|
+-- src/
|   +-- server.ts
|
+-- dist/
|   +-- server.js
|
+-- node_modules/
+-- package.json
+-- package-lock.json
+-- tsconfig.json
+-- .gitignore


IMPORTANT NOTES
===============

- Node.js 22.15.0 is fine for this setup.
- ts-node-dev is used by "npm run dev".
- tsx is available as an alternative development runner.
- ts-node is installed because you requested it, but it is not required for the normal dev command.
- TypeScript 6.0.3 is used with ts-node 10.9.2 to avoid the ts.sys.fileExists compatibility error.


