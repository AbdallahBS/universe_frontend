import { useNavigate, NavigateOptions } from "react-router-dom";

export function useNavigatePage() {
  const navigate = useNavigate();

  return (url: string, options?: NavigateOptions) => {
    navigate(url, options);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
