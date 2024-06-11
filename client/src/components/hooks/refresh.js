import {watchEffect} from "vue";

function refresh  (functionName, intervalTime = 1000) {
    return watchEffect(() => {
        const interval = setInterval(functionName, intervalTime);
        return () => clearInterval(interval);
    });
};

export default refresh