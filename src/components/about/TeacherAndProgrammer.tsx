const TeacherAndProgrammer = () => {
  return (
    <>
      <style>{style}</style>
      <div className="programmer-img-container">
        {/* <img className="programmer-img" src="/programmer.jpg" /> */}
          <img className="programmer-img" src="/programmerWithBk.jpg" />
      </div>

      <div className="teacher-img-container">
        {/* <img className="teacher-img" src="/teacher.jpg" /> */}
            <img className="teacher-img" src="/teacherWithBk.jpg" />
      </div>
    </>
  );
};

const style = `
    .teacher-img {
        width:300px;
        height:400px;
    }
    .programmer-img {
        width:300px;
        height:380px;
    }
   .teacher-img-container {
        width:220px;
        position:absolute;
        right:6%;
        top:45%;      
    }
 
    .programmer-img-container {
        width:220px;
        position:absolute;
        top:1%;
      
    }


    @media screen and (max-width: 60em) {
      .programmer-img ,.teacher-img{
        width:150px;
        height:200px;
        
      }
      .teacher-img-container{
        left:85%;
      }
      body{
        overflow-x:hidden
      }
      @media screen and (max-width: 35em){
         .programmer-img ,.teacher-img{
           display:none
         }
      }
`;

export default TeacherAndProgrammer;