const TeacherAndProgrammer = () => {
  return (
    <>
      <style>{style}</style>
      <div className="programmer-img-container">
        <img className="programmer-img" src="/programmer.png" />
      </div>

      <div className="teacher-img-container">
        <img className="teacher-img" src="/teacher.png" />
      </div>
    </>
  );
};

const style = `
    .teacher-img {
        width:400px;
        height:380px;
    }
    .programmer-img {
        width:340px;
        height:360px;
    }
   .teacher-img-container {
        width:220px;
        position:absolute;
        right:10vw;
        top:45%;      
    }
    .programmer-img-container {
        width:220px;
        position:absolute;
        top:0%;
    }
    body {
      overflow-x:hidden
    }
    @media screen and (max-width: 60em) {
        .programmer-img {
          width:200px;
          height:220px;
        }
        .teacher-img{
          width:230px;
          height:240px;
        }
        .teacher-img-container{
          right:-4%;
        }
        body {
          overflow-x:hidden
        }
        @media screen and (max-width: 35em){
          .programmer-img ,.teacher-img{
            display:none
        }
      }
`;

export default TeacherAndProgrammer;