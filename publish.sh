#! /bin/bash
npm run build
path=`pwd`

scp -r $path/wanbiaogame root@120.55.12.45:/data/www
