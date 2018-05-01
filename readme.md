# sleep
* [honeo/sleep](https://github.com/honeo/sleep)  
* [@honeo/sleep](https://www.npmjs.com/package/@honeo/sleep)


## なにこれ
よくあるPromiseなsleep関数。


## 使い方
```bash
$ npm i @honeo/sleep
```
```js
import sleep from '@honeo/sleep';

// or Dynamic import, CDN
const sleep = await import('https://cdn.rawgit.com/honeo/sleep/master/index.mjs').then( (mod)=>{
	return mod.default;
});

await sleep(1000).then( (arg)=>{
	console.log(arg); // after 1sec "foobar"
});
```

## Prototype拡張
ご利用は計画的に。
```js
import '@honeo/sleep/register';

Promise.resolve()
	.sleep(1000)
	.then()
	.catch()
	.finnaly();
```
