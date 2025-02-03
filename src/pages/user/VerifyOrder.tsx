/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from 'react-router-dom';
import { useVerifyOrderQuery } from '../../store/features/order/orderApi';
import Navbar from '../../components/Home/Navbar/Navbar';
import AppFooter from '../../components/Home/Footer/Footer';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Card, Descriptions, Tag, Button, Space } from 'antd';
import { CheckCircleOutlined, WarningOutlined, DownloadOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import Spinner from '../../components/Shared/Spinner';

const { Title } = Typography;

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const { data: orderData, isLoading } = useVerifyOrderQuery(orderId, {
    refetchOnMountOrArgChange: true,
  });

  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    const element = invoiceRef.current;
    const options = {
      scale: 2,
      useCORS: true,
      logging: false,
    } as any;

    const canvas = await html2canvas(element, options);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgWidth = pdfWidth - 20; // Leave some padding
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight > pdfHeight - 20) {
      let yPosition = 10;
      let remainingHeight = imgHeight;

      while (remainingHeight > 0) {
        pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);
        remainingHeight -= pdfHeight;
        yPosition = -pdfHeight + 10; // Adjust for new page
        if (remainingHeight > 0) pdf.addPage();
      }
    } else {
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    }

    pdf.save(`invoice-${orderData?.data?.order_id}.pdf`);
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{ padding: '2rem 0', maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '1.5rem 0',
            }}
          >
            <Title level={2}>Order Verification</Title>
            <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownloadPDF}>
              Download Invoice
            </Button>
          </div>

          <div ref={invoiceRef}>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="Order Details" bordered={false}>
                  <Descriptions column={{ xs: 1, sm: 2 }} layout="horizontal">
                    <Descriptions.Item label="Order ID">
                      {orderData?.data?.order_id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Amount">
                      {orderData?.data?.currency} {orderData?.data?.amount?.toFixed(2)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                      <Tag color={orderData?.data?.bank_status === 'Success' ? 'success' : 'error'}>
                        {orderData?.data?.bank_status}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Date">
                      {new Date(orderData?.data?.date_time)?.toLocaleString()}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card title="Payment Information" bordered={false}>
                  <Descriptions column={{ xs: 1, sm: 2 }} layout="horizontal">
                    <Descriptions.Item label="Method">{orderData?.data?.method}</Descriptions.Item>
                    <Descriptions.Item label="Transaction ID">
                      {orderData?.data?.bank_trx_id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Invoice No">
                      {orderData?.data?.invoice_no}
                    </Descriptions.Item>
                    <Descriptions.Item label="SP Code">
                      {orderData?.data?.sp_code}
                    </Descriptions.Item>
                    <Descriptions.Item label="SP Message" span={2}>
                      {orderData?.data?.sp_message}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card title="Customer Information" bordered={false}>
                  <Descriptions column={{ xs: 1, sm: 2 }} layout="horizontal">
                    <Descriptions.Item label="Name">{orderData?.data?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{orderData?.data?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{orderData?.data?.phone_no}</Descriptions.Item>
                    <Descriptions.Item label="Address">
                      {orderData?.data?.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="City">{orderData?.data?.city}</Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card
                  title="Verification Status"
                  bordered={false}
                  actions={[
                    <Link to="/user/orders" key="viewOrders">
                      <Button type="primary" block>
                        View Orders
                      </Button>
                    </Link>,
                  ]}
                >
                  <Space size="middle">
                    {orderData?.data?.is_verify === 1 ? (
                      <>
                        <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '24px' }} />
                        <span>Verified</span>
                      </>
                    ) : (
                      <>
                        <WarningOutlined style={{ color: '#faad14', fontSize: '24px' }} />
                        <span>Not Verified</span>
                      </>
                    )}
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      )}

      <AppFooter />
    </>
  );
};

export default VerifyOrder;
