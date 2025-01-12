import * as fs from 'fs/promises';

try{
    await fs.mkdir('/Users/bijayadhs/Desktop/GitHubPush/09_mern_movie_app/backend/practice/test', {recursive: true});
    const data = fs.readdir('test/text.txt', 'utf-8');
    console.log((data));
}catch(err){
    console.log(err);
}