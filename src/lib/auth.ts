// 토큰 저장
export const setToken = (token: string) => {
  localStorage.setItem("tk-mcp-repo", token);
};

// 토큰 가져오기
export const getToken = () => {
  return localStorage.getItem("tk-mcp-repo");
};

// 토큰 삭제 (로그아웃)
export const removeToken = () => {
  localStorage.removeItem("tk-mcp-repo");
  localStorage.removeItem("user-info");
};

// 인증 헤더 생성
export const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 사용자 정보 저장
export const setUserInfo = (userInfo: any) => {
  localStorage.setItem("user-info", JSON.stringify(userInfo));
};

// 사용자 정보 가져오기
export const getUserInfo = () => {
  const userInfo = localStorage.getItem("user-info");
  return userInfo ? JSON.parse(userInfo) : null;
};

// 로그인 상태 확인
export const isAuthenticated = () => {
  return !!getToken();
};

// 사용자 정보 가져오기 API 호출
export const fetchUserInfo = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No token found");
      return null;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!baseUrl) {
      console.error("API URL is not configured");
      return null;
    }

    console.log("Fetching user info from:", `${baseUrl}/api/v1/users/me`);

    const response = await fetch(`${baseUrl}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      console.error("Failed to fetch user info. Status:", response.status);
      const errorData = await response.text();
      console.error("Error response:", errorData);

      if (response.status === 401) {
        removeToken();
        throw new Error("Unauthorized: Invalid token");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw user data received:", data);

    if (!data) {
      throw new Error("No data received from server");
    }

    // 데이터 구조가 이미 data 객체로 감싸져 있는지 확인
    const userData = data.data || data;

    // 데이터 구조 확인 및 변환
    const userInfo = {
      data: {
        id: userData.id || userData.userId || 0,
        email: userData.email || "",
        name: userData.name || userData.username || "",
        imageUrl: userData.imageUrl || userData.avatar || "",
        socialType: userData.socialType || userData.provider || "",
        role: userData.role || "USER"
      }
    };

    console.log("Transformed user info:", userInfo);
    setUserInfo(userInfo);
    return userInfo;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    removeToken();
    return null;
  }
};

// 로그인 콜백 처리
export const handleAuthCallback = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      console.error("No token found in URL");
      return false;
    }

    setToken(token);

    // 사용자 정보 가져오기
    const userInfo = await fetchUserInfo();

    if (!userInfo) {
      console.error("Failed to fetch user info");
      removeToken();
      return false;
    }

    // 토큰 파라미터 제거
    const newUrl = window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);

    return true;
  } catch (error) {
    console.error("Error in handleAuthCallback:", error);
    removeToken();
    return false;
  }
};
