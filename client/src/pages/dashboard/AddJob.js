import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
    const {
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        handleJobChange,
        clearJobValues,
        createJob,
    } = useAppContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        // * 这三个 values 在表格中都是一定要填写的, 像底下的 status 和 Job Type 都是 dropdown 类型的input, 会有默认值
        // if (!position || !company || !jobLocation) {
        //     displayAlert();
        //     return;
        // }

        // 如果处于 edit 状态, 不进行 create job 的操作

        if (isEditing) {
            return;
        }
        createJob();
        console.log("user created");
    };

    const handleJobInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        handleJobChange(name, value);
    };

    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? "edit job" : "add job"} </h3>
                {showAlert && <Alert />}

                <div className="form-center">
                    {/* position cell */}
                    <FormRow
                        inputType="text"
                        name="position"
                        value={position}
                        handleChange={handleJobInput}
                    />
                    {/* company cell */}
                    <FormRow
                        inputType="text"
                        name="company"
                        value={company}
                        handleChange={handleJobInput}
                    />
                    {/* location cell */}
                    <FormRow
                        inputType="text"
                        labelText="location"
                        name="jobLocation"
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />

                    {/* job type dropdown */}
                    <FormRowSelect
                        name="jobType"
                        labelText="Job Type"
                        options={jobTypeOptions}
                        handleChange={handleJobInput}
                        value={jobType}
                    />

                    {/* job status dropdown */}
                    <FormRowSelect
                        name="status"
                        labelText="Application Status"
                        options={statusOptions}
                        handleChange={handleJobInput}
                        value={status}
                    />

                    {/* submit button */}
                    <div className="btn-container">
                        <button
                            className="btn btn-block submit-btn"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                        <button
                            className="btn btn-block clear-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                clearJobValues();
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;
