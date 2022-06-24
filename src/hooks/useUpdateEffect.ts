import { DependencyList, EffectCallback, useEffect, useRef } from "react";

function useUpdateEffect(callback: EffectCallback, deps: DependencyList) {
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useUpdateEffect;
