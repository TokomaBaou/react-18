import "./styles.css";
import { useState, startTransition, useTransition } from "react";
import { Spinner } from "./Spinner";

export const App = () => {
  //React 18での更新点は大きく3つある
  /** レンダリングのバッチ化
   * トランディションの導入
   *　<Suspence/>のサーバーサイドレンダリング
   */

  /**　大きな目的は？ =>
   *  並行レンダリングによる、高速なユーザー体験の提供 */

  //1.　レンダリングのバッチ化
  /**以前では2つの状態の更新に反応して2回レンダリングが行われていたけど、
   * handleClick()実行時の再レンダリングが１回のみになった
   */
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  //   function handleClick() {
  //     fetchSomething().then(() => {
  //       setCount((c) => c + 1);
  //       setFlag((f) => !f);
  //     });
  //   }

  //2.トランジションの導入
  /** ユーザーインプット時の入力ズレなどのストレスが減る？
   * 裏で非同期処理による通信が走っているので、受け取ったら結果が表示される
   * startTransitionの引数に渡したコールバック内での状態の更新は急ぐ必要がないものとして判断され裏で処理される
   *　優先順位が下がる
   */

  // 即座に反映される
  //   setInputValue(input);

  //　裏で処理される
  //   startTransition(() => {
  //     setSearchQuery(input);
  //   });

  /**  useTransitionでレンダリングを後回しにしている状態(isPending) *
   * と　startTransition関数を取得することができる
   * isPendingを利用することでコンポーネントをローディング表示に切り替えることができる
   *　startTransition関数を読み込んでいる間のローディング表示
   */

  const [isPending, startTransition] = useTransition();

  /** 外のコンポーネントやカスタムフックにて更新される状態に対して
   * トランジションを適用したい場合↓
   * SearchSuggestons要素の更新はトランジションによって裏側で実行される
   */

  //   function Typeahead() {
  //     // 外からのカスタムフック
  //     const query = useSearchQuery("");

  //     const deferredQuery = useDeferredValue(query);

  //     return (
  //       <>
  //         <SearchInput query={query} />
  //         <Suspense fallback="Loading results...">
  //           <SearchSuggestions query={deferredQuery} />
  //         </Suspense>
  //       </>
  //     );
  //   }

  //   Typeahead();
  
  /** まずuseMemo useCallBack で解決しない
   * そんな時に使う。処理を遅らせるためのものだから
   * 至るところで使うと意味がない
   */

  /** Suspence のサーバーサイドレンダリング対応*/

  return (
    <div className="App">
      <h1>React 18</h1>
      {isPending && <Spinner />}
      <button onClick={handleClick}>Next</button>
    </div>
  );
};
