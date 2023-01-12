import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Home} from "../home/home";

import {
    Table,
    Typography,
    Avatar,
    Button,
    Col,
    Row,
    notification,
    Popconfirm,
} from "antd";
import {EyeOutlined, PlusOutlined, DeleteOutlined} from "@ant-design/icons";

import {
    ApiErrorResponse,
    ApiResponse,
    Allergy,
} from "../../types/shared.types";
import {fetchAllergies, removeAllergy} from "../../shared/reducers/allergyreducer";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux.hooks";
import {ColumnsType} from "antd/es/table";
import TableComponent from "../../shared/component/dataTable";

const {Title} = Typography;

const AllergyList = () => {
    const [api, contextHolder] = notification.useNotification();

    const allergy = useAppSelector((state) => state.allergy);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        getAllergies();
    }, []);

    const getAllergies = async () => {
        try {
            await dispatch(fetchAllergies());
        } catch (error) {
            const err = error as ApiErrorResponse;

            api["error"]({
                message: err.message || "Something went wrong",
                description: `${err.data.info}` || "",
            });
        }
    };

    const handleDelete = async (id: string) => {
        let response: ApiResponse;
        try {
            response = await dispatch(removeAllergy(id)).unwrap();
        } catch (error) {
            const err = error as ApiErrorResponse;

            api["error"]({
                message: err.message || "Something went wrong",
                description: `${err.data.info}` || "",
            });

            return;
        }
        api["success"]({
            message: response.message || "Something completed",
            description: `${response.message}` || "",
        });
    };

    const practitionerColumn: ColumnsType<Allergy> = [
        {
            title: "Practitioner ID",
            dataIndex: "id",
            key: "id",
            width: "0px",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "100px",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Severity",
            dataIndex: "severity",
            key: "severity",
        },
        {
            title: "Symptoms",
            dataIndex: "symptoms",
            key: "symptoms",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (value: any) => {
                return <Avatar src={value}/>;
            },
        },
        {
            title: "",
            key: "Actions",
            width: "300px",
            render: (value: Allergy) => {
                return (
                    <>
                        <Popconfirm
                            title="Are you sure you want to delete?"
                            onConfirm={() => handleDelete(value.id!)}
                        >
                            <Button
                                style={{marginLeft: "20px"}}
                                type="primary"
                                icon={<DeleteOutlined/>}
                                danger
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            {contextHolder}

            <Row
                justify="space-between"
                align="middle"
                style={{marginBottom: "24px"}}
            >
                <Col span={4}>
                    <Title level={2}>Practitioner List</Title>
                </Col>
                <Col span={3}>
                    <Button
                        type="primary"
                        style={{width: "100%"}}
                        icon={<PlusOutlined/>}
                        onClick={() => navigate("/practitioner/new")}
                    >
                        Add Practitioner
                    </Button>
                </Col>
            </Row>

            <TableComponent
                columns={practitionerColumn} dataSource={allergy.allergies}            />
        </div>
    );
};

export default AllergyList;