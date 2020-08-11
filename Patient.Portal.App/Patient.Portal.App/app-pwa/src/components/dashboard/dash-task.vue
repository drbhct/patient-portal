<template>
  <form class="form-horizontal">
    <h3>My Task List</h3>
    <img class="dash-divider" src="img/line-divider-transparent-1_edited.png" />
    <div class="form-group row">
      <div class="col-12 col-lg-8 col-xl-8">
        <table class="w-100">
          <tbody>
            <tr>
              <td class="dash-task-col-title">1. Pay Statement #3564</td>
              <td class="dash-task-col-action">
                <button class="mb-1 mt-1 mr-1 btn btn-sm btn-primary dash-task-btn">PAY $520</button>
                <p class="p-dash-stat">Statement due: 02/02/2020</p>
              </td>
            </tr>
            <tr>
              <td class="dash-task-col-title">2. Patient Complaint Form #3564</td>
              <td class="dash-task-col-action">
                <button class="mb-1 mt-1 mr-1 btn btn-sm btn-primary dash-task-btn">
                  GO TO FORM
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </form>
</template>
<style scoped>
  .dash-divider {
    width: 400px;
    height: 10px;
    margin-bottom: 10px;
  }
</style>
