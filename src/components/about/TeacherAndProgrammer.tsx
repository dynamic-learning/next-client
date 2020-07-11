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
        width:220px;
        height:300px;
    }
    .programmer-img {
        width:220px;
        height:250px;
    }
    .teacher-img-container {
        width:220px;
        position:absolute;
        right:0;
    }
    .programmer-img-container {
        width:220px;
        display:inline-block;
    }
`;

export default TeacherAndProgrammer;
