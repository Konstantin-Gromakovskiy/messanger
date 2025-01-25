import { useGetChannelsQuery } from '../redux/store/channelApi.js';

const MainPage = () => {
  const { data = [] } = useGetChannelsQuery();

  return (
    <div>
      {data.map((item) => <div key={item.id}>{item.name}</div>)}
    </div>
  );
};

export default MainPage;
