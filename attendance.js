// ==========================================
// CAMPUSFLOW - ATTENDANCE SYSTEM
// ==========================================

// Sample attendance data
// Later this can be connected to a real backend/database.

const attendanceData = [
  {
    subject: "Data Structures",
    total: 42,
    present: 38
  },
  {
    subject: "Database Management",
    total: 40,
    present: 35
  },
  {
    subject: "Operating Systems",
    total: 38,
    present: 31
  },
  {
    subject: "Computer Networks",
    total: 36,
    present: 32
  },
  {
    subject: "Web Technologies",
    total: 44,
    present: 41
  }
];


// ==========================================
// CALCULATE ATTENDANCE
// ==========================================

function calculateAttendance(data) {

  const totalClasses = data.reduce(
    (sum, subject) => sum + subject.total,
    0
  );

  const totalPresent = data.reduce(
    (sum, subject) => sum + subject.present,
    0
  );

  const totalAbsent =
    totalClasses - totalPresent;

  const percentage =
    totalClasses === 0
      ? 0
      : (totalPresent / totalClasses) * 100;

  return {
    totalClasses,
    totalPresent,
    totalAbsent,
    percentage
  };
}


// ==========================================
// ATTENDANCE STATUS
// ==========================================

function getStatus(percentage) {

  if (percentage >= 85) {

    return {
      text: "Excellent",
      className: "green"
    };

  }

  if (percentage >= 75) {

    return {
      text: "Safe",
      className: "green"
    };

  }

  if (percentage >= 65) {

    return {
      text: "Warning",
      className: "yellow"
    };

  }

  return {
    text: "Critical",
    className: "red"
  };

}


// ==========================================
// RENDER SUBJECTS
// ==========================================

function renderAttendance() {

  const table =
    document.getElementById(
      "attendanceRows"
    );

  table.innerHTML = "";


  attendanceData.forEach(subject => {

    const absent =
      subject.total - subject.present;

    const percentage =
      (subject.present / subject.total) * 100;

    const rounded =
      percentage.toFixed(1);

    const status =
      getStatus(percentage);


    const row =
      document.createElement("tr");


    row.innerHTML = `

      <td>
        <strong>
          ${subject.subject}
        </strong>
      </td>

      <td>
        ${subject.total}
      </td>

      <td>
        ${subject.present}
      </td>

      <td>
        ${absent}
      </td>

      <td>

        <div style="min-width:120px">

          <div class="bar-meta">

            <span>
              ${rounded}%
            </span>

          </div>

          <div class="progress">

            <span
              style="width:${Math.min(
                percentage,
                100
              )}%">
            </span>

          </div>

        </div>

      </td>

      <td>

        <span
          class="pill ${status.className}">
          ${status.text}
        </span>

      </td>

    `;


    table.appendChild(row);

  });

}


// ==========================================
// UPDATE SUMMARY
// ==========================================

function updateSummary() {

  const summary =
    calculateAttendance(
      attendanceData
    );


  const percentage =
    summary.percentage.toFixed(1);


  document.getElementById(
    "overallAttendance"
  ).textContent =
    percentage + "%";


  document.getElementById(
    "classesAttended"
  ).textContent =
    summary.totalPresent;


  document.getElementById(
    "classesMissed"
  ).textContent =
    summary.totalAbsent;


  const status =
    getStatus(summary.percentage);


  const statusElement =
    document.getElementById(
      "attendanceStatus"
    );


  statusElement.innerHTML = `

    <span
      class="pill ${status.className}">

      ${status.text}

    </span>

  `;

}


// ==========================================
// ATTENDANCE INTELLIGENCE
// ==========================================

function generateInsight() {

  const lowestSubject =
    [...attendanceData].sort(
      (a, b) => {

        const first =
          a.present / a.total;

        const second =
          b.present / b.total;

        return first - second;

      }
    )[0];


  const percentage =
    (
      lowestSubject.present /
      lowestSubject.total
    ) * 100;


  const insight =
    document.getElementById(
      "attendanceInsight"
    );


  if (percentage < 75) {

    insight.innerHTML = `

      <div class="recommend">

        🚨 <strong>
        Attendance Risk Detected
        </strong>

        <p class="muted small">

          Your attendance in
          <strong>
            ${lowestSubject.subject}
          </strong>
          is only
          ${percentage.toFixed(1)}%.

          You may need to attend upcoming
          classes regularly to reach the
          required eligibility level.

        </p>

      </div>

    `;

  } else {

    insight.innerHTML = `

      <div class="recommend">

        ✅ <strong>
        Attendance is under control
        </strong>

        <p class="muted small">

          Your lowest attendance is in
          <strong>
            ${lowestSubject.subject}
          </strong>
          at
          ${percentage.toFixed(1)}%.

          Keep attending regularly to maintain
          your eligibility.

        </p>

      </div>

    `;

  }

}


// ==========================================
// DARK MODE
// ==========================================

const themeButton =
  document.getElementById(
    "themeBtn"
  );


if (themeButton) {

  themeButton.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "dark"
      );

    }
  );

}


// ==========================================
// INITIALIZE
// ==========================================

renderAttendance();

updateSummary();

generateInsight();
