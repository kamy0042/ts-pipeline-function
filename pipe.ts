type User = {
    name: string;
    email: string;
};

/**
 * 動作：関数をpipelineで繋ぐ。初期値argで渡した値を順番に処理し、１つの値を返す。
 *
 * 1 複数の関数を１つ目の引数に取り、配列に格納する
 * 2 ２つ目の引数には初期値を入れる
 * 3 関数が格納された配列をreduceで畳み込む。
 * 　初期値を引数に取って関数を実行 → 返り値を引数に取って次の関数を実行
 *
 * x:前回の計算の返り値
 * f:引数で渡した関数
 * arg:xの初期値
 */
const pipe = <T>(...fns: ((n: T) => T)[]) => (arg: T) => fns.reduce((x, f) => f(x), arg);

// 初期値
const userA = { name: "user a", email: "user-a@hoge.com" };

// 動作確認用の関数
const setName = (name: string) => (u: User) => ({ ...u, name });
const setEmail = (email: string) => (u: User) => ({ ...u, email });

// 初期値（userA）を加工し、別のユーザーを返す
const userA2 = pipe<User>(setName("user a2"), setEmail("user-a2@hoge.com"))(userA);

//結果確認
console.log(userA2);
