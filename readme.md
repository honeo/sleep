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
// ESM
import sleep from '@honeo/sleep';

// Dynamic import & CDN
const {default: sleep} = await import('https://raw.githack.com/honeo/sleep/master/index.mjs');


await sleep(1000, 'foobar').then( (arg)=>{
	console.log(arg); // after 1sec "foobar"
});
```

## API

### sleep([ms|date [, arg [, options]]])
```js
// 1sec
await sleep(1000);

// promise<"foo">
await sleep(1000, 'foo');

// AbortController
await sleep(1000, 'bar', {
	signal: new AbortController().signal
}).catch( (err)=>{
	console.log(err.message); // "sleep: aborted"
});

// date
const date_after1s = new Date(Date.now()+1000);
await sleep(date_after1s);

// very fucking bad
sleep(1000, null, {
	sync: true
});


// default
sleep(1, undefined, {
	sync: false
});
```


## Breaking Changes

### v2

#### CommonJS
廃止。

#### sleep()
引数1にdefault値を設定。

#### register (Promise.prototype.sleep)
廃止。
