import React from "react";
import Card from "../components/common/Master/Card";
import SectionHeader from "../components/common/Data/InfoRecord/SectionHeader";
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaHospital } from "react-icons/fa";
import ScrollButtons from "../components/common/Scroll/ScrollButtons";
import YoutubeEmbed from "../components/common/Video/YoutubeEmbed";
import ImageWithLightbox from "../components/common/Image/ImageWithLightbox";
import Banner from "../components/home/Banner"

const Home = () => {
  const googleMapsLink = "https://www.google.com/maps/place/B%E1%BB%87nh+vi%E1%BB%87n+%C4%91a+khoa+Xuy%C3%AAn+%C3%81+V%C4%A9nh+Long/@10.2605328,105.9405192,17z";

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 grid-row-12 gap-2 mt-2 w-full min-h-screen relative xl:px-[50px] 2xl:px-[80px]`}>

      {/*Banner */}
      <Card className={`md:col-span-12 h-auto`}>
        <Banner />
      </Card>

      {/*Thông tin chung */}
      <Card className={`md:col-span-3 relative`}>
        <div className="md:sticky md:top-4 md:z-50">
          <SectionHeader title="Thông tin chung" />
          <div className="grid grid-cols-1 gap-4 text-sm mt-1">
            <div className="space-y-2 px-2">
              <p className="flex items-center">
                <FaPhoneAlt className="w-4 h-4 text-blue-600 mr-2" />
                <span>
                  <strong>Cấp cứu (24/24):</strong> <span className="text-red-600 font-semibold">(0270) 6250 999</span>
                </span>
              </p>
              <p className="flex items-center">
                <FaPhoneAlt className="w-4 h-4 text-blue-600 mr-2" />
                <span>
                  <strong>Tổng đài:</strong> 1800 9075
                </span>
              </p>
              <p className="flex items-center">
                <FaClock className="w-4 h-4 text-blue-600 mr-2" />
                <span>
                  <strong>Thời gian khám bệnh:</strong> 07:00 - 12:00 | 13:00 - 16:00
                </span>
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="w-4 h-4 text-blue-600 mr-2" />
                <span>
                  <strong>Địa chỉ:</strong> <span className="text-blue-600">68E Phạm Hùng, Phường 9, TP Vĩnh Long, Tỉnh Vĩnh Long</span>
                </span>
              </p>
              <p className="flex items-center">
                <FaHospital className="w-4 h-4 text-blue-600 mr-2" />
                <span>
                  <strong>Bệnh viện Đa khoa Xuyên Á - Vĩnh Long</strong>
                </span>
              </p>
            </div>
            <div className="space-y-2">
              {/* Bản đồ nhỏ + Click mở tab mới */}
              <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                <div className="mt-3 w-full h-60 border rounded-lg overflow-hidden cursor-pointer hover:opacity-90">
                  <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0139769642276!2d105.9405192!3d10.2605328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a82e2287c14a1%3A0x393eb9e8762987d3!2zQsOqbmggduG7i2VuIMSRYSBrb2EgWHV54buBbiBMacOgbmc!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Card>

      {/*Giới thiệu */}
      <Card className={`md:col-span-9`}>
        <SectionHeader title="Giới thiệu" />
        <div className="grid grid-cols-1 md:grid-cols-12 grid-row-12 gap-2 mt-2 w-full">
          <div className="md:col-span-12 text-center text-blue-900">
            <div className="uppercase text-3xl font-semibold">Bệnh viện đa khoa xuyên á vĩnh long</div>
          </div>
          <div className="md:col-span-12 text-lg text-justify">
            <p className="indent-8 mb-6">
              Bắt đầu động thổ từ ngày 10/10/2016, chỉ trong vòng chưa đầy 2 năm, Bệnh viện Xuyên Á – Vĩnh Long (BVXA-VL) đã hoàn tất và chính thức đi vào hoạt động vào ngày 16/8/2018. Tọa lạc tại địa chỉ 68E Phạm Hùng, Phường 9, Thành Phố Vĩnh Long, Tỉnh Vĩnh Long, BVXA-VL được kỳ vọng sẽ phát triển thành trung tâm y tế lớn của khu vực cửa ngõ Vĩnh Long và cả vùng Đồng Bằng Sông Cửu Long, góp phần vào sự phát triển ngành y tế và chăm sóc sức khỏe chất lượng cho người dân nơi đây.
            </p>
            <p className="indent-8 mb-6">
              BVXA-VL được thiết kế và xây dựng dựa trên sự hài hòa giữa thẩm mỹ và công năng với cơ sở vật chất khang trang cùng hệ thống trang thiết bị hiện đại. Bệnh viện tập trung đầu tư đồng bộ đội ngũ nhân sự có trình độ chuyên môn cao cùng sự tâm huyết dành cho sự phát triển chung của toàn bộ hệ thống Bệnh viện. Bệnh viện được xây dựng trên khuôn viên đất 16.000 m2, xây dựng 10 tầng, có tổng diện tích sử dụng hơn 65.000 m2. Với tổng số vốn 1.150 tỷ đồng, bệnh viện có thể đáp ứng cho 1.183 giường bệnh nội trú.
            </p>
            <ImageWithLightbox
              className="mb-6"
              src="http://bvxuyena.com.vn/wp-content/uploads/2018/10/BVXA-Vinh-Long-1024x724.jpg"
              alt="BVXA Vinh Long"
            />
            <p className="indent-8 mb-6">
              Với tư duy hướng về bệnh nhân cũng như tạo điều kiện tốt nhất cho mọi đối tượng bệnh nhân được tiếp cận với y tế kỹ thuật cao với chi phí hợp lý nhất, BVXA-VL xây dựng một không gian mở, tận dụng tối đa lợi thế thiên nhiên, không những tạo sự thoải mái cho người bệnh trong quá trình điều trị, mà còn giúp tiết kiệm nguồn năng lượng, giảm gánh nặng chi phí cho người bệnh. Trong đầu tư, Bệnh viện đã tính toán chặt chẽ những phương án đầu tư trang thiết bị đúng mục đích, đúng thời điểm, nhằm khai thác hiệu suất đầu tư một cách tối đa. Phương tiện máy móc hiện đại, chẩn đoán chính xác, điều trị nhanh khỏi bệnh, thời gian nằm viện ngắn chính là góp phần làm giảm chi phí cho người bệnh. Ngoài ra, bệnh viện đã sớm tập trung đầu tư hệ thống công nghệ thông tin gần như có thể tự động hóa hoàn toàn về công tác quản lý, điều này cũng nhằm mục đích tiết kiệm rất nhiều về nguồn nhân lực phục vụ cho công tác hành chánh và quản lý. Đây cũng là một yếu tố quan trọng góp phần làm giảm giá thành khám chữa bệnh.
            </p>
            <p className="indent-8 mb-6">
              Một điểm nổi bật khác đó là từ ngày 3/9/2018, BVXA-VL chính thức tiếp nhận thẻ bảo hiểm y tế thông tuyến toàn quốc. BVXA-VL xem đối tượng BHYT là đối tượng quan trọng, mang tính chiến lược ngay từ khi bắt đầu hoạt động. Với giá thành thấp, một phần được BHYT chi trả, gánh nặng về tài chính của người bệnh được giảm thiểu. Qua 2 tháng hoạt động, tỉ lệ người dân có thẻ BHYT đến khám chữa bệnh tại BVXA-VL chiếm rất cao từ 70-75%. Chính sách BHYT luôn được cập nhật và vận dụng đề cuối cùng người dân sẽ được hưởng lợi nhiều nhất. Chính vì vậy chi phí khám chữa bệnh tại BVXA-VL luôn thấp nhất trong tất cả các bệnh viện ngoài công lập, và thậm chí còn thấp hơn chi phí khám chữa bệnh tại các bệnh viện công lập nếu điều trị theo yêu cầu.
            </p>
            <p className="indent-8 mb-6">
              Từ những ngày đầu hoạt động, BVXA-VL đã sớm quyết tâm phát triển đầy đủ các chuyên khoa với 28 khoa lâm sàng và cận lâm sàng, bao gồm cả các khoa chuyên sâu như can thiệp tim mạch, phẫu thuật tim hở, mạch máu, lồng ngực, thần kinh – sọ não, cột sống, ung thư… Bên cạnh đó là 11 phòng mổ đạt tiêu chuẩn quốc tế, 02 phòng can thiệp tim mạch hiện đại. Với định hướng tập trung chuyên sâu vào kỹ thuật can thiệp học và hệ thống chẩn đoán cận lâm sàng, BVXA-VL đã trang bị các hệ thống tiên tiến như: máy chụp cắt lớp vi tính (CT Scanner) 160 lát cắt, máy chụp cộng hưởng từ (MRI) 1.5 Tesla, hệ thống chụp mạch số hóa xóa nền (DSA) và hàng loạt các hệ thống chẩn đoán hình ảnh, xét nghiệm tiên tiến. Hiện tại, bệnh viện đang trong tiến trình đưa vào hoạt động thêm 1 hệ thống máy chụp cộng hưởng từ (MRI) 1.5 Tesla để đáp ứng nhu cầu ngày càng tăng cao của bệnh nhân.
            </p>
            <ImageWithLightbox
              className="mb-6"
              src="http://bvxuyena.com.vn/wp-content/uploads/2018/10/Ảnh-BVXA-Vĩnh-Long-tiếp-đón-đông-đảo-bệnh-nhân-1024x679.jpg"
              alt="BVXA Vinh Long"
            />
            <p className="indent-8 mb-6">
              Mặt khác, tổng số nhân sự bệnh viện hiện có 825 người, trong đó 185 bác sĩ (70% có trình độ sau đại học). Tất cả nhân sự trước khi tiếp cận chính thức công việc tại BVXA-VL đều phải qua khóa huấn luyện từ ít nhất 3 tháng về chuyên môn, quy trình làm việc, phong cách giao tiếp và nhất quán về tư tưởng phục vụ hướng về bệnh nhân tại BVXA-TP.HCM. Điều đặc biệt nhất là trong số 185 bác sĩ này có khoảng 30% là các bác sĩ tại thành phố Hồ Chí Minh đã tình nguyện về công tác tại Vĩnh Long để phục vụ bà con nơi đây. Hơn thế nưã, sự hỗ trợ tích cực từ các chuyên gia của BVXA-TP.HCM về chuyên môn cũng như kỹ năng quản lý là một điều hết sức thuận lợi cho sự phát triển nhanh chóng của BVXA-VL.
            </p>
            <p className="indent-8 mb-6">
              Mặc dù mới chỉ đi vào hoạt động trong thời gian ngắn, BVXA-VL đã không ngừng phát triển qua từng ngày và đạt được những bước tiến không tưởng. Hiện tại, lượng bệnh ngoại trú hàng ngày đã vượt mốc 2000 lượt, lượng bệnh điều trị nội trú hàng ngày đạt 750 – 800 bệnh nhân, thậm chí một số khoa phòng có tình trạng quá tải. Riêng lĩnh vực cấp cứu, mỗi ngày BVXA-VL tiếp nhận gần 150 lượt, chủ yếu là bệnh nặng. Phòng mổ hoạt động liên tục với trung bình 30-50 ca phẫu thuật mỗi ngày. Các dịch vụ y tế kỹ thuật cao được sử dụng rộng rãi tại đây như: can thiệp mạch vành qua máy DSA điều trị nhồi máu cơ tim cấp, thay khớp háng – khớp gối nhân tạo, phẫu thuật u não, phẫu thuật cấp cứu chấn thương sọ não, phẫu thuật điều trị ung thư… Đặc biệt, BVXA-VL đã triển khai phẫu thuật hàng trăm ca trong lĩnh vực cột sống thành công. Bệnh nhân sau mổ đều phục hồi tốt, chất lượng sống được cải thiện. Phẫu thuật nội soi khớp và thay khớp cũng đã trở thành kỹ thuật thường qui và đại trà tại BVXA-VL. Điều này chứng tỏ niềm tin của người dân vào hệ thống Bệnh viện Xuyên Á đã và đang gia tăng theo từng ngày, cũng như chiến lược phát triển y tế y tế kỹ thuật cao, chất lượng cao với giá thu thấp của Bệnh viện là đúng hướng.
            </p>
            <ImageWithLightbox
              className="mb-6"
              src="http://bvxuyena.com.vn/wp-content/uploads/2018/10/Ảnh-can-thiệp-mạch-não-qua-máy-DSA-1024x683.jpg"
              alt="BVXA Vinh Long"
            />
            <p className="indent-8 mb-6">
              Trong thời gian hoạt động ban đầu, BVXA-VL đã đạt được rất nhiều thành tựu, mà trong đó hai điểm sáng nổi bật là phẫu thuật cấp cứu sọ não và can thiệp tim mạch cấp cứu. Trong lĩnh vực cấp cứu sọ não, BVXA-VL đã cứu sống hơn 20 ca chấn thương sọ não nặng do tai nạn giao thông. Các bệnh nhân nhập viện trong tình trạng rất nguy hiểm, đều được xử trí rất nhanh, chuyên nghiệp và chuẩn xác nhờ việc tận dụng một cách hiệu quả nền tảng cơ sở vật chất, trang thiết bị máy móc đầy đủ và hiện đại, dưới sự phối hợp của các bác sĩ giỏi từ các chuyên khoa khác nhau trên toàn bệnh viện.
            </p>
            <p className="indent-8 mb-6">
              Với can thiệp tim mạch, nhờ tận dụng hiệu quả thời gian vàng, tính đến nay, BVXA-VL đã can thiệp đặt stent và cứu sống thành công hơn 100 trường hợp, trong đó có rất nhiều ca vào viện trong tình trạng ngưng tim hoặc rối loạn nhịp nặng, đe dọa tính mạng, nhiều ca phải vừa phải đặt máy tạo nhịp cùng lúc với đặt stent. BVXA-VL tự hào là bệnh viện tư nhân hiện đại tại Vĩnh Long triển khai kỹ thuật can thiệp tim mạch điều trị các trường hợp nhồi máu cơ tim/nhồi máu não. Trước đây, những trường hợp này thường phải chuyển đến điều trị tại Cần Thơ hoặc TP.HCM, điều này làm giảm tỉ lệ sống và tăng khả năng biến chứng của bệnh nhân vì không tận dụng được thời gian vàng.
            </p>
          </div>
          <div className="md:col-span-12 text-center ">
            <YoutubeEmbed videoId="VlGl2qS_IMQ" />
          </div>
        </div>
      </Card>

      {/* Thêm nút cuộn */}
      <ScrollButtons />
    </div>
  );
};

export default Home;
