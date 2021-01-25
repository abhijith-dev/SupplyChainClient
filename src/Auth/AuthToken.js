const GetToken=()=>{
   const token=localStorage.getItem('token');
   if(token===null){
       return null
   }
   else{
       return token;
   }
}
const SetToken=(token)=>{
    localStorage.setItem('token',token);
}
const RemoveToken=()=>{
    localStorage.clear();
}



module.exports={
    SetToken:SetToken,
    GetToken:GetToken,
    RemoveToken:RemoveToken
}