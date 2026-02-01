const mongoose = require("mongoose");
const TechArticle = require("./models/TechArticle");
require("dotenv").config();

const techArticles = [
  {
    title: "Công Nghệ Xử Lý Nước Tiên Tiến",
    titleEn: "Advanced Water Treatment Technology",
    content: `
      <h2>Giới thiệu về Công nghệ Xử lý Nước Tiên tiến</h2>
      <p>Hệ thống xử lý nước hiện đại của chúng tôi sử dụng công nghệ lọc đa tầng tiên tiến, đảm bảo loại bỏ hoàn toàn tạp chất, vi khuẩn và các chất độc hại khỏi nguồn nước, mang lại nguồn nước sạch, an toàn cho sản xuất công nghiệp.</p>
      
      <h3>Các tính năng nổi bật:</h3>
      <ul>
        <li>Hệ thống lọc đa tầng với màng RO công nghệ Mỹ</li>
        <li>Tự động kiểm soát chất lượng nước 24/7</li>
        <li>Khử khuẩn bằng tia UV và Ozone</li>
        <li>Hệ thống tái sinh tự động, tiết kiệm chi phí</li>
        <li>Giám sát từ xa qua ứng dụng di động</li>
      </ul>

      <h3>Ứng dụng:</h3>
      <p>Công nghệ này được ứng dụng rộng rãi trong các ngành:</p>
      <ul>
        <li>Sản xuất thực phẩm và đồ uống</li>
        <li>Dược phẩm và mỹ phẩm</li>
        <li>Điện tử và vi mạch</li>
        <li>Hóa chất và xử lý bề mặt</li>
      </ul>

      <h3>Lợi ích kinh tế:</h3>
      <p>Tiết kiệm đến 40% chi phí vận hành so với phương pháp truyền thống, đồng thời đảm bảo chất lượng nước đầu ra đạt tiêu chuẩn quốc tế.</p>
    `,
    contentEn: `
      <h2>Introduction to Advanced Water Treatment Technology</h2>
      <p>Our modern water treatment system uses advanced multi-layer filtration technology, ensuring complete removal of impurities, bacteria and harmful substances from water sources, providing clean and safe water for industrial production.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li>Multi-layer filtration system with US RO membrane technology</li>
        <li>Automatic 24/7 water quality control</li>
        <li>Disinfection by UV and Ozone</li>
        <li>Automatic regeneration system, cost savings</li>
        <li>Remote monitoring via mobile app</li>
      </ul>

      <h3>Applications:</h3>
      <p>This technology is widely applied in industries:</p>
      <ul>
        <li>Food and beverage production</li>
        <li>Pharmaceuticals and cosmetics</li>
        <li>Electronics and microchips</li>
        <li>Chemicals and surface treatment</li>
      </ul>

      <h3>Economic Benefits:</h3>
      <p>Save up to 40% of operating costs compared to traditional methods, while ensuring output water quality meets international standards.</p>
    `,
    thumbnail: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200",
    ],
    slug: "cong-nghe-xu-ly-nuoc-tien-tien",
    published: true,
  },
  {
    title: "Giải Pháp Hóa Chất Thân Thiện Môi Trường",
    titleEn: "Eco-Friendly Chemical Solutions",
    content: `
      <h2>Hóa Chất Xanh - Tương Lai Bền Vững</h2>
      <p>Các sản phẩm hóa chất của chúng tôi được nghiên cứu và phát triển dựa trên công nghệ sinh học hiện đại, giảm thiểu tác động đến môi trường trong khi vẫn đảm bảo hiệu quả cao trong quá trình sản xuất.</p>

      <h3>Ưu điểm vượt trội:</h3>
      <ul>
        <li>Phân hủy sinh học 100% sau sử dụng</li>
        <li>Không chứa phosphate và các chất độc hại</li>
        <li>Tiết kiệm nước và năng lượng trong quá trình sử dụng</li>
        <li>Đạt chứng nhận xanh quốc tế ISO 14001</li>
        <li>An toàn cho người sử dụng và môi trường</li>
      </ul>

      <h3>Sản phẩm chính:</h3>
      <ul>
        <li>Chất tẩy rửa công nghiệp sinh học</li>
        <li>Dung dịch khử trùng không độc hại</li>
        <li>Hóa chất xử lý bề mặt thân thiện môi trường</li>
        <li>Chất phụ gia thực phẩm tự nhiên</li>
      </ul>

      <h3>Cam kết của chúng tôi:</h3>
      <p>100% sản phẩm được kiểm nghiệm nghiêm ngặt, đảm bảo an toàn tuyệt đối cho con người và hệ sinh thái.</p>
    `,
    contentEn: `
      <h2>Green Chemicals - Sustainable Future</h2>
      <p>Our chemical products are researched and developed based on modern biotechnology, minimizing environmental impact while ensuring high efficiency in the production process.</p>

      <h3>Outstanding Advantages:</h3>
      <ul>
        <li>100% biodegradable after use</li>
        <li>Contains no phosphates and toxic substances</li>
        <li>Save water and energy during use</li>
        <li>ISO 14001 international green certification</li>
        <li>Safe for users and the environment</li>
      </ul>

      <h3>Main Products:</h3>
      <ul>
        <li>Biological industrial cleaners</li>
        <li>Non-toxic disinfectant solutions</li>
        <li>Eco-friendly surface treatment chemicals</li>
        <li>Natural food additives</li>
      </ul>

      <h3>Our Commitment:</h3>
      <p>100% of products are rigorously tested, ensuring absolute safety for humans and ecosystems.</p>
    `,
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200",
    ],
    slug: "giai-phap-hoa-chat-than-thien-moi-truong",
    published: true,
  },
  {
    title: "Hệ Thống Tự Động Hóa Sản Xuất",
    titleEn: "Production Automation System",
    content: `
      <h2>Tự Động Hóa Toàn Diện</h2>
      <p>Ứng dụng công nghệ IoT và AI tiên tiến, hệ thống tự động hóa của chúng tôi giúp tối ưu hóa quy trình sản xuất, giảm thiểu sai sót con người và nâng cao năng suất lao động lên đến 300%.</p>

      <h3>Tính năng công nghệ:</h3>
      <ul>
        <li>Điều khiển PLC Siemens S7-1500 thế hệ mới</li>
        <li>Hệ thống SCADA giám sát toàn bộ quy trình</li>
        <li>AI dự đoán và phòng ngừa sự cố</li>
        <li>Robot tự động hóa linh hoạt</li>
        <li>Tích hợp ERP/MES quản lý sản xuất</li>
      </ul>

      <h3>Lợi ích doanh nghiệp:</h3>
      <ul>
        <li>Tăng năng suất 200-300%</li>
        <li>Giảm 95% lỗi do con người</li>
        <li>Tiết kiệm 60% chi phí nhân công</li>
        <li>Giám sát real-time mọi lúc mọi nơi</li>
        <li>Dữ liệu phân tích để tối ưu hóa liên tục</li>
      </ul>

      <h3>Case Study:</h3>
      <p>Khách hàng trong ngành sản xuất linh kiện điện tử đã tăng năng suất 280% và giảm 92% tỷ lệ lỗi sau 6 tháng triển khai hệ thống.</p>
    `,
    contentEn: `
      <h2>Comprehensive Automation</h2>
      <p>Applying advanced IoT and AI technology, our automation system helps optimize production processes, minimize human errors and increase labor productivity by up to 300%.</p>

      <h3>Technology Features:</h3>
      <ul>
        <li>New generation Siemens S7-1500 PLC control</li>
        <li>SCADA system monitors the entire process</li>
        <li>AI predicts and prevents incidents</li>
        <li>Flexible automation robots</li>
        <li>ERP/MES production management integration</li>
      </ul>

      <h3>Business Benefits:</h3>
      <ul>
        <li>Increase productivity by 200-300%</li>
        <li>Reduce human errors by 95%</li>
        <li>Save 60% labor costs</li>
        <li>Real-time monitoring anytime, anywhere</li>
        <li>Analytical data for continuous optimization</li>
      </ul>

      <h3>Case Study:</h3>
      <p>A customer in the electronic component manufacturing industry increased productivity by 280% and reduced error rate by 92% after 6 months of system implementation.</p>
    `,
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200",
    ],
    slug: "he-thong-tu-dong-hoa-san-xuat",
    published: true,
  },
  {
    title: "Công Nghệ Tiết Kiệm Năng Lượng",
    titleEn: "Energy Saving Technology",
    content: `
      <h2>Giải Pháp Năng Lượng Thông Minh</h2>
      <p>Hệ thống quản lý năng lượng thông minh EMS (Energy Management System) giúp doanh nghiệp giảm đến 45% chi phí điện năng, đồng thời bảo vệ môi trường và đạt các tiêu chuẩn xanh quốc tế.</p>

      <h3>Công nghệ áp dụng:</h3>
      <ul>
        <li>Biến tần tiết kiệm điện cho động cơ</li>
        <li>Hệ thống chiếu sáng LED thông minh</li>
        <li>Điều hòa trung tâm VRV tiết kiệm năng lượng</li>
        <li>Thu hồi nhiệt thải công nghiệp</li>
        <li>Năng lượng mặt trời và năng lượng tái tạo</li>
      </ul>

      <h3>Tính năng giám sát:</h3>
      <ul>
        <li>Đo lường năng lượng theo thời gian thực</li>
        <li>Phân tích xu hướng tiêu thụ</li>
        <li>Cảnh báo tiêu thụ bất thường</li>
        <li>Báo cáo chi tiết theo ca/ngày/tháng</li>
        <li>Tối ưu hóa tự động dựa trên AI</li>
      </ul>

      <h3>ROI & Hiệu quả:</h3>
      <p>Thời gian hoàn vốn trung bình 18-24 tháng. Tiết kiệm 30-45% chi phí năng lượng hàng năm. Giảm 40% lượng khí thải CO2.</p>
    `,
    contentEn: `
      <h2>Smart Energy Solutions</h2>
      <p>The smart Energy Management System (EMS) helps businesses reduce electricity costs by up to 45%, while protecting the environment and achieving international green standards.</p>

      <h3>Applied Technology:</h3>
      <ul>
        <li>Energy-saving inverters for motors</li>
        <li>Smart LED lighting system</li>
        <li>Energy-efficient VRV central air conditioning</li>
        <li>Industrial waste heat recovery</li>
        <li>Solar and renewable energy</li>
      </ul>

      <h3>Monitoring Features:</h3>
      <ul>
        <li>Real-time energy measurement</li>
        <li>Consumption trend analysis</li>
        <li>Abnormal consumption alerts</li>
        <li>Detailed reports by shift/day/month</li>
        <li>AI-based automatic optimization</li>
      </ul>

      <h3>ROI & Effectiveness:</h3>
      <p>Average payback period 18-24 months. Save 30-45% annual energy costs. Reduce CO2 emissions by 40%.</p>
    `,
    thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200",
    ],
    slug: "cong-nghe-tiet-kiem-nang-luong",
    published: true,
  },
  {
    title: "Kiểm Soát Chất Lượng Tự Động",
    titleEn: "Automated Quality Control",
    content: `
      <h2>Hệ Thống QC 4.0</h2>
      <p>Ứng dụng AI và Machine Vision, hệ thống kiểm soát chất lượng tự động đảm bảo 100% sản phẩm được kiểm tra, phát hiện lỗi với độ chính xác 99.9%, nhanh hơn 50 lần so với kiểm tra thủ công.</p>

      <h3>Công nghệ kiểm tra:</h3>
      <ul>
        <li>Camera công nghiệp 4K với AI Vision</li>
        <li>Cảm biến đo lường chính xác µm</li>
        <li>X-Ray kiểm tra khuyết tật bên trong</li>
        <li>Phân tích quang phổ chất liệu</li>
        <li>Test tự động các thông số kỹ thuật</li>
      </ul>

      <h3>Khả năng phát hiện:</h3>
      <ul>
        <li>Khuyết tật bề mặt (vết trầy, lỗi, vết bẩn)</li>
        <li>Sai lệch kích thước ±0.01mm</li>
        <li>Lỗi lắp ráp và thiếu linh kiện</li>
        <li>Màu sắc không đồng nhất</li>
        <li>Khuyết tật ẩn bên trong sản phẩm</li>
      </ul>

      <h3>Dữ liệu & Truy xuất:</h3>
      <p>Lưu trữ 100% dữ liệu kiểm tra, cho phép truy xuất nguồn gốc từng sản phẩm. Hệ thống phân tích xu hướng lỗi để cải tiến liên tục.</p>
    `,
    contentEn: `
      <h2>QC 4.0 System</h2>
      <p>Applying AI and Machine Vision, the automated quality control system ensures 100% products are inspected, detecting defects with 99.9% accuracy, 50 times faster than manual inspection.</p>

      <h3>Inspection Technology:</h3>
      <ul>
        <li>4K industrial camera with AI Vision</li>
        <li>µm precision measurement sensors</li>
        <li>X-Ray for internal defect inspection</li>
        <li>Material spectrum analysis</li>
        <li>Automatic technical parameter testing</li>
      </ul>

      <h3>Detection Capabilities:</h3>
      <ul>
        <li>Surface defects (scratches, holes, stains)</li>
        <li>Dimensional deviation ±0.01mm</li>
        <li>Assembly errors and missing components</li>
        <li>Color inconsistency</li>
        <li>Hidden defects inside products</li>
      </ul>

      <h3>Data & Traceability:</h3>
      <p>Store 100% inspection data, allowing traceability of each product. System analyzes error trends for continuous improvement.</p>
    `,
    thumbnail: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1200",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200",
    ],
    slug: "kiem-soat-chat-luong-tu-dong",
    published: true,
  },
  {
    title: "Công Nghệ Xử Lý Chất Thải",
    titleEn: "Waste Treatment Technology",
    content: `
      <h2>Giải Pháp Xử Lý Chất Thải Toàn Diện</h2>
      <p>Hệ thống xử lý chất thải công nghiệp tiên tiến, đáp ứng các tiêu chuẩn môi trường nghiêm ngặt nhất như QCVN 40:2011, EPA và WHO, giúp doanh nghiệp sản xuất bền vững và bảo vệ môi trường.</p>

      <h3>Công nghệ xử lý:</h3>
      <ul>
        <li>Xử lý nước thải: MBBR, MBR, SBR hiệu quả cao</li>
        <li>Xử lý khí thải: Scrubber, Activated Carbon, RTO</li>
        <li>Xử lý chất thải rắn: Phân loại, nén, tái chế</li>
        <li>Xử lý bùn thải: Ép khô, sấy nhiệt, tái sử dụng</li>
        <li>Xử lý chất thải nguy hại theo quy định</li>
      </ul>

      <h3>Tiêu chuẩn đạt được:</h3>
      <ul>
        <li>Nước thải: COD < 50mg/l, BOD < 30mg/l</li>
        <li>Khí thải: Bụi < 100mg/Nm³, SO2, NOx đạt chuẩn</li>
        <li>Tiếng ồn: < 70dB tại ranh giới nhà máy</li>
        <li>100% chất thải nguy hại được xử lý đúng quy định</li>
      </ul>

      <h3>Giá trị gia tăng:</h3>
      <p>Thu hồi năng lượng từ quá trình xử lý. Tái chế nước và chất thải để tái sử dụng. Giảm 80% chi phí xử lý so với phương pháp truyền thống.</p>
    `,
    contentEn: `
      <h2>Comprehensive Waste Treatment Solutions</h2>
      <p>Advanced industrial waste treatment system, meeting the strictest environmental standards such as QCVN 40:2011, EPA and WHO, helping businesses produce sustainably and protect the environment.</p>

      <h3>Treatment Technology:</h3>
      <ul>
        <li>Wastewater treatment: High-efficiency MBBR, MBR, SBR</li>
        <li>Gas treatment: Scrubber, Activated Carbon, RTO</li>
        <li>Solid waste treatment: Classification, compression, recycling</li>
        <li>Sludge treatment: Dewatering, thermal drying, reuse</li>
        <li>Hazardous waste treatment according to regulations</li>
      </ul>

      <h3>Standards Achieved:</h3>
      <ul>
        <li>Wastewater: COD < 50mg/l, BOD < 30mg/l</li>
        <li>Gas emissions: Dust < 100mg/Nm³, SO2, NOx compliant</li>
        <li>Noise: < 70dB at factory boundary</li>
        <li>100% hazardous waste treated properly</li>
      </ul>

      <h3>Added Value:</h3>
      <p>Energy recovery from treatment process. Recycle water and waste for reuse. Reduce treatment costs by 80% compared to traditional methods.</p>
    `,
    thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200",
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200",
    ],
    slug: "cong-nghe-xu-ly-chat-thai",
    published: true,
  },
  {
    title: "Hệ Thống Giám Sát Thông Minh",
    titleEn: "Smart Monitoring System",
    content: `
      <h2>IoT & Big Data trong Sản Xuất</h2>
      <p>Công nghệ IoT kết hợp Big Data Analytics cho phép giám sát và điều khiển toàn bộ quy trình sản xuất từ xa, tối ưu hóa hiệu suất vận hành và đưa ra quyết định dựa trên dữ liệu thực tế.</p>

      <h3>Hệ thống cảm biến:</h3>
      <ul>
        <li>Hơn 1000 điểm đo IoT trong nhà máy</li>
        <li>Cảm biến nhiệt độ, áp suất, lưu lượng</li>
        <li>Cảm biến rung động dự đoán bảo trì</li>
        <li>Camera AI phân tích hành vi sản xuất</li>
        <li>Cảm biến môi trường (khí, bụi, tiếng ồn)</li>
      </ul>

      <h3>Nền tảng phân tích:</h3>
      <ul>
        <li>Dashboard trực quan real-time</li>
        <li>AI dự đoán sự cố trước 24-48h</li>
        <li>Phân tích xu hướng và KPI tự động</li>
        <li>Báo cáo tùy chỉnh theo yêu cầu</li>
        <li>Tích hợp với ERP, MES, WMS</li>
      </ul>

      <h3>Lợi ích vận hành:</h3>
      <p>Giảm 70% thời gian chết máy. Tăng 35% hiệu suất thiết bị (OEE). Giảm 50% chi phí bảo trì. Quyết định nhanh dựa trên dữ liệu thời gian thực.</p>
    `,
    contentEn: `
      <h2>IoT & Big Data in Manufacturing</h2>
      <p>IoT technology combined with Big Data Analytics enables remote monitoring and control of the entire production process, optimizing operational efficiency and making decisions based on real data.</p>

      <h3>Sensor System:</h3>
      <ul>
        <li>Over 1000 IoT measurement points in the factory</li>
        <li>Temperature, pressure, flow sensors</li>
        <li>Vibration sensors for predictive maintenance</li>
        <li>AI cameras analyzing production behavior</li>
        <li>Environmental sensors (gas, dust, noise)</li>
      </ul>

      <h3>Analytics Platform:</h3>
      <ul>
        <li>Intuitive real-time dashboard</li>
        <li>AI predicts incidents 24-48h in advance</li>
        <li>Automatic trend and KPI analysis</li>
        <li>Customized reports on demand</li>
        <li>Integration with ERP, MES, WMS</li>
      </ul>

      <h3>Operational Benefits:</h3>
      <p>Reduce machine downtime by 70%. Increase equipment efficiency (OEE) by 35%. Reduce maintenance costs by 50%. Fast decisions based on real-time data.</p>
    `,
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    ],
    slug: "he-thong-giam-sat-thong-minh",
    published: true,
  },
  {
    title: "Công Nghệ Làm Sạch Không Khí",
    titleEn: "Air Purification Technology",
    content: `
      <h2>Hệ Thống Lọc Không Khí Công Nghiệp</h2>
      <p>Giải pháp lọc không khí tiên tiến loại bỏ 99.97% các hạt bụi, khí độc hại, vi khuẩn và virus khỏi môi trường sản xuất, đảm bảo sức khỏe người lao động và chất lượng sản phẩm.</p>

      <h3>Công nghệ lọc đa tầng:</h3>
      <ul>
        <li>Pre-filter: Lọc bụi thô > 10µm</li>
        <li>HEPA H13: Lọc 99.97% hạt ≥ 0.3µm</li>
        <li>Activated Carbon: Hấp thụ khí độc, mùi</li>
        <li>UV-C Sterilization: Diệt khuẩn 99.9%</li>
        <li>Plasma Ion: Khử tĩnh điện, thanh lọc không khí</li>
      </ul>

      <h3>Ứng dụng trong ngành:</h3>
      <ul>
        <li>Phòng sạch điện tử, dược phẩm Class 100-10000</li>
        <li>Nhà máy thực phẩm đạt chuẩn HACCP</li>
        <li>Xưởng sơn, hóa chất xử lý khí thải VOC</li>
        <li>Văn phòng, không gian làm việc hiện đại</li>
        <li>Bệnh viện, phòng khám y tế</li>
      </ul>

      <h3>Hiệu quả môi trường:</h3>
      <p>PM2.5 giảm > 95%. Nồng độ VOC giảm 90%. Số lượng vi khuẩn giảm 99.9%. Cải thiện năng suất lao động 20% nhờ môi trường làm việc sạch.</p>
    `,
    contentEn: `
      <h2>Industrial Air Filtration System</h2>
      <p>Advanced air filtration solution removes 99.97% of dust particles, toxic gases, bacteria and viruses from the production environment, ensuring worker health and product quality.</p>

      <h3>Multi-layer Filtration Technology:</h3>
      <ul>
        <li>Pre-filter: Filters coarse dust > 10µm</li>
        <li>HEPA H13: Filters 99.97% particles ≥ 0.3µm</li>
        <li>Activated Carbon: Absorbs toxic gases, odors</li>
        <li>UV-C Sterilization: Kills 99.9% bacteria</li>
        <li>Plasma Ion: Anti-static, air purification</li>
      </ul>

      <h3>Industry Applications:</h3>
      <ul>
        <li>Electronics, pharmaceutical cleanrooms Class 100-10000</li>
        <li>Food factories meeting HACCP standards</li>
        <li>Paint shops, chemical plants treating VOC emissions</li>
        <li>Modern offices, workspaces</li>
        <li>Hospitals, medical clinics</li>
      </ul>

      <h3>Environmental Effectiveness:</h3>
      <p>PM2.5 reduced > 95%. VOC concentration reduced 90%. Bacteria count reduced 99.9%. 20% labor productivity improvement thanks to clean working environment.</p>
    `,
    thumbnail: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200",
      "https://images.unsplash.com/photo-1545259742-12323cd4fddb?w=1200",
    ],
    slug: "cong-nghe-lam-sach-khong-khi",
    published: true,
  },
  {
    title: "Công Nghệ Bảo Trì Dự Đoán",
    titleEn: "Predictive Maintenance Technology",
    content: `
      <h2>AI & Machine Learning trong Bảo Trì</h2>
      <p>Hệ thống bảo trì dự đoán sử dụng AI phân tích dữ liệu từ hàng nghìn cảm biến để dự báo chính xác thời điểm thiết bị cần bảo trì, giảm 90% thời gian chết máy không kế hoạch.</p>

      <h3>Công nghệ giám sát:</h3>
      <ul>
        <li>Phân tích rung động (Vibration Analysis)</li>
        <li>Nhiệt ảnh hồng ngoại (Thermal Imaging)</li>
        <li>Phân tích dầu nhờn (Oil Analysis)</li>
        <li>Phân tích siêu âm (Ultrasonic Testing)</li>
        <li>Giám sát dòng điện động cơ (MCSA)</li>
      </ul>

      <h3>AI dự đoán sự cố:</h3>
      <ul>
        <li>Học máy phân tích 500+ thông số</li>
        <li>Dự báo chính xác 85-95%</li>
        <li>Cảnh báo sớm 7-30 ngày trước khi hỏng</li>
        <li>Tối ưu lịch bảo trì tự động</li>
        <li>Giảm 60% chi phí phụ tùng dự trữ</li>
      </ul>

      <h3>ROI & Tiết kiệm:</h3>
      <p>Giảm 40-50% chi phí bảo trì. Tăng 25-30% tuổi thọ thiết bị. Giảm 70-90% thời gian chết máy. Tăng 15-20% năng suất tổng thể.</p>
    `,
    contentEn: `
      <h2>AI & Machine Learning in Maintenance</h2>
      <p>Predictive maintenance system uses AI to analyze data from thousands of sensors to accurately predict when equipment needs maintenance, reducing unplanned downtime by 90%.</p>

      <h3>Monitoring Technology:</h3>
      <ul>
        <li>Vibration Analysis</li>
        <li>Thermal Imaging</li>
        <li>Oil Analysis</li>
        <li>Ultrasonic Testing</li>
        <li>Motor Current Signature Analysis (MCSA)</li>
      </ul>

      <h3>AI Failure Prediction:</h3>
      <ul>
        <li>Machine learning analyzes 500+ parameters</li>
        <li>85-95% prediction accuracy</li>
        <li>Early warning 7-30 days before failure</li>
        <li>Automatic maintenance schedule optimization</li>
        <li>60% reduction in spare parts inventory costs</li>
      </ul>

      <h3>ROI & Savings:</h3>
      <p>40-50% reduction in maintenance costs. 25-30% increase in equipment lifespan. 70-90% reduction in downtime. 15-20% increase in overall productivity.</p>
    `,
    thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200",
      "https://images.unsplash.com/photo-1581092918484-8313e1f7e8e3?w=1200",
    ],
    slug: "cong-nghe-bao-tri-du-doan",
    published: true,
  },
];

async function seedTechArticles() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce");
    console.log("✅ Connected to MongoDB");

    // Clear existing tech articles
    await TechArticle.deleteMany({});
    console.log("🗑️  Cleared existing tech articles");

    // Insert new tech articles
    const result = await TechArticle.insertMany(techArticles);
    console.log(`✅ Successfully seeded ${result.length} tech articles!`);

    // Display summary
    console.log("\n📋 Tech Articles Summary:");
    result.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title} (${article.slug})`);
    });

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding tech articles:", error);
    process.exit(1);
  }
}

seedTechArticles();
