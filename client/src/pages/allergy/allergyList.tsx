import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

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

} from "../../types/shared.types";
import {createAllergy, fetchAllergies, removeAllergy} from "../../shared/reducers/allergyreducer";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux.hooks";
import {ColumnsType} from "antd/es/table";
import TableComponent from "../../shared/UI/dataTable";
import {IAllergy} from "../../types/allergy.types";
import {AllergyForm} from "./AllergyForm";
import callApi from "../../shared/api";

const {Title} = Typography;

const AllergyList = () => {
    const [api, contextHolder] = notification.useNotification();

    const allergy = useAppSelector((state) => state.allergy);
    const [showCartForm, setShowCartForm] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        getAllergies();
    }, []);

    const showHideFormHandler = () => {
        setShowCartForm(!showCartForm);
    }
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

    const practitionerColumn: ColumnsType<IAllergy> = [
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
            render: (value: IAllergy) => {
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

    const onsubmitForm = (values: IAllergy) =>{
        const formData = new FormData();
        formData.append('name',values.name);
        formData.append('image',values.image[0]);
        formData.append('severity',values.severity);
        formData.append('symptoms',values.symptoms);
        formData.append('description',values.description);
        dispatch(createAllergy(formData));
    };
    return (
        <div>
            {contextHolder}

            <Row
                justify="space-between"
                align="middle"
                style={{marginBottom: "24px"}}
            >
                <Col span={4}>
                    <Title level={2}>Allergy List</Title>
                </Col>
                <Col span={3}>
                    <Button
                        type="primary"
                        style={{width: "100%"}}
                        icon={<PlusOutlined/>}
                        onClick={showHideFormHandler}
                    >
                        Register Allergy
                    </Button>
                </Col>
            </Row>
            {showCartForm && <AllergyForm onSubmit={onsubmitForm} />}

            <TableComponent
                columns={practitionerColumn} dataSource={allergy.data.allergies}/>
        </div>
    );
};

export default AllergyList;