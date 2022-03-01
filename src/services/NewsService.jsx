import axios from "axios";

class NewsService {
  static async getNews() {
      const response  = await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=bc92e80f41db4f76b4b83247b1d61f57");
      console.log("sssssss", response.data.articles)
      return response.data.articles;
  }
  
}

export default NewsService;
