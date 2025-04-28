export {}
declare global {
  interface slideBar{
    isWidowOpen:boolean;
    isProfileOpen:boolean ;
  }
  type QuizQuestion = {
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    difficulty: "easy" | "medium" | "hard";
    type: "multiple" | "boolean";
  };
  type user = {
    user:{

      name: string;
      email: string;
      image: string;
      accessToken: string;
      refreshToken: string;
      role: 'admin' | 'user' | 'client'
    }
  };
  interface campaignData{
  campaignName:string,
  isLive:string,
  clientCount:number,
  userCount:number,
  totalAmount:number
  }
  
}