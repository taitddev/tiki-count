import useSWR from "swr";
import axios from "axios";
import { convertDate, numberWithCommas } from "./util";
import "./App.css";

function App() {
  const url = "https://tiki.vn/api/v2/me/orders?page=1&limit=9999";

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          "x-access-token": process.env.REACT_APP_API_TOKEN,
        },
      })
      .then((res) => res.data);

  // fetch data
  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const filteredOrder = data.data.filter((item) => item.status !== "canceled");

  //console.log(filteredOrder);

  // render data
  return (
    <div className="App">
      {/* Table */}
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden sm:rounded-lg shadow-md">
              <table class="min-w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Mã đơn hàng
                    </th>
                    <th
                      scope="col"
                      class="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Ngày mua
                    </th>
                    <th
                      scope="col"
                      class="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Sản phẩm
                    </th>
                    <th
                      scope="col"
                      class="text-xs font-medium text-gray-700 px-6 py-3 text-right uppercase tracking-wider"
                    >
                      Tổng tiền
                    </th>
                    <th
                      scope="col"
                      class="text-xs font-medium text-gray-700 px-6 py-3 text-right uppercase tracking-wider"
                    >
                      Trạng thái đơn hàng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrder.map((item) => (
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.id}
                      </td>
                      <td class="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                        {convertDate(item.created_at)}
                      </td>
                      <td class="text-sm text-gray-500 px-6 py-4">
                        {item.description}
                      </td>
                      <td class="text-sm text-gray-500 px-6 text-right py-4 whitespace-nowrap">
                        {`${numberWithCommas(item.grand_total)} đ`}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {item.status_text}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* End table */}
      
      <h1 className="text-4xl">Thống kê số tiền đã mua tại Tiki, Sọp pe</h1>
      {/* {filteredOrder.map((item) => (
        <div className="">
          <div>Mã đơn hàng: {item.id}</div>
          <div>Trạng thái: {item.status_text}</div>
          <div>Tổng tiền: {item.grand_total}</div>
        </div>
      ))} */}
    </div>
  );
}

export default App;
