export const fetchRequest = async (url, { method = "GET", headers = {}, body = null, queryParams = {} } = {}) => {
  try {
    // 处理 Query 参数
    const queryString = new URLSearchParams(queryParams).toString();
    const requestUrl = queryString ? `${url}?${queryString}` : url;

    // 组装请求配置
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      }
    };

    // 处理 Body 数据
    if (body && method !== "GET") {
      config.body = JSON.stringify(body);
    }

    // 发送请求
    const response = await fetch(requestUrl, config);

    // 解析 JSON 响应
    const contentType = response.headers.get("Content-Type");
    const isJson = contentType && contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    // 处理错误
    if (!response.ok) {
      throw new Error(data?.message || `HTTP error! Status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Fetch 请求失败:", error);
    throw error;
  }
};