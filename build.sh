yarn sync;
git add -A
git commit -m "Updated cache";
git push -u origin master;
yarn predeploy;
yarn deploy;
yarn build;