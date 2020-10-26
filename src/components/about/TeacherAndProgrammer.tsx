const TeacherAndProgrammer = () => {
  return (
    <>
      <style>{style}</style>
      <div className="programmer-img-container">
        <img className="programmer-img" src="/programmer.jpg" />
      </div>
      <div className="teacher-img-container">
        <img className="teacher-img" src="/teacher.jpg" />
      </div>
    </>
  );
};

const style = `
    .teacher-img {
        width:220px;
        height:260px;     
    }
    .programmer-img {
        width:220px;
        height:200px;
    }
    .teacher-img-container {
        width:220px;
        position:absolute;
        right:0;
        top:60vh;      
    }
    .programmer-img-container {
        width:220px;
        transform:translateY(-40%);
        display:inline-block;
    }


    @media screen and (max-width: 60em) {
      .programmer-img ,.teacher-img{
        display:none;
      }
`;

export default TeacherAndProgrammer;