import { useSelector } from 'react-redux';

const TestPage = () => {
  const stateNow = useSelector((state) => state.auth);
  console.log(stateNow);

  return (
    <div>
      Это тестовая страница
    </div>
  );
};

export default TestPage;
