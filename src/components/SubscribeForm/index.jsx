import React, { useState, useEffect } from "react";
import { fetchRequest } from "@utils/fetch.js"

const SubscribeForm = ({className = ""}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const onSubscribe = async () => {
    if (!validateEmail(email)) {
      setStatus("请输入有效的邮箱地址");
      return;
    }
    try {
      const res = await fetchRequest(`${process.env.GATSBY_WORKER_DOMIN}/auth/subscribe`,{
        method: "POST",
        body: {
          email
        }
      })
      if (res.status === 200) {
        setStatus("订阅成功，感谢支持！");
        // 可选: 清空表单
        setEmail("");
      } else {
        setStatus(res.msg || "订阅失败，请稍后再试");
      }
    } catch (error) {
      console.error("订阅请求失败:", error);
      setStatus("网络错误，请稍后再试");
    }
  };

  return (
    <div className={`max-w-md mx-auto p-6space-y-4 ${className}`}>  
      <h2 className="text-2xl font-bold text-center">订阅最新资讯</h2>
      <div className="flex">
        <input
          type="email"
          placeholder="请输入邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg flex-grow mr-2 text-gray-900"
        />

        <button
          onClick={onSubscribe}
          className="w-36 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 "
        >
          完成订阅
        </button>
      </div>
      {status && (
        <div className="text-center text-sm text-gray-700 mt-2">{status}</div>
      )}
    </div>
  );
};

export default SubscribeForm;