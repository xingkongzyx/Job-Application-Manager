import { FormRow, Alert } from "../../components";
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
    } = useAppContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        // * 这三个在表格中都是一定要的 values, 像底下的 status 和 Job Type 都是 dropdown 类型的input, 会有默认值
        if (!position || !company || !jobLocation) {
            displayAlert();
            return;
        }

        console.log("user created");
    };

    const handleJobInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(`${name}:${value}`);
    };

    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? "edit job" : "add job"} </h3>
                {showAlert && <Alert />}

                {/* position cell */}
                <div className="form-center">
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
                    <div className="form-row">
                        <label
                            htmlFor="jobType"
                            className="form-label"
                        >
                            Job Type
                        </label>

                        <select
                            name="jobType"
                            value={jobType}
                            onChange={handleJobInput}
                            className="form-select"
                        >
                            {jobTypeOptions.map(
                                (itemValue, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={itemValue}
                                        >
                                            {itemValue}
                                        </option>
                                    );
                                }
                            )}
                        </select>
                    </div>

                    {/* job status dropdown */}
                    <div className="form-row">
                        <label
                            htmlFor="jobType"
                            className="form-label"
                        >
                            Application Status
                        </label>

                        <select
                            name="status"
                            value={status}
                            onChange={handleJobInput}
                            className="form-select"
                        >
                            {statusOptions.map((itemValue, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={itemValue}
                                    >
                                        {itemValue}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* submit button */}
                    <div className="btn-container">
                        <button
                            className="btn btn-block submit-btn"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;
