import "../../styles/pages/profile.css";
import UserImg from '../../assets/images/dp.jpg'

const Profile = () => {
  return (
    <section className={"profile-section"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="content" className="content content-full-width">
              <div className="profile">
                <div className="profile-header">
                  <div className="profile-header-cover"></div>

                  <div className="profile-header-content">
                    <div className="profile-header-img">
                      <img src={UserImg} alt="" />
                    </div>

                    <div className="profile-header-info">
                      <h4 className="m-t-10 m-b-5">dean</h4>
                      <p className="m-b-10">hunter</p>
                      <a href="" className="btn btn-sm btn-info mb-2">
                        Edit Profile
                      </a>
                    </div>
                  </div>

                  <ul className="profile-header-tab nav nav-tabs">
                    <li className="nav-item">
                      <a href="" target="__blank" className="nav-link_">
                        POSTS
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="" target="__blank" className="nav-link_">
                        PHOTOS
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="" target="__blank" className="nav-link_">
                        VIDEOS
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="" target="__blank" className="nav-link_">
                        CHAT
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="profile-content">
                <div className="tab-content p-0">
                  <div className="tab-pane fade active show" id="profile-post">
                    <ul className="timeline">
                      <li>
                        <div className="timeline-time">
                          <span className="date">today</span>
                          <span className="time">04:20</span>
                        </div>

                        <div className="timeline-icon">
                          <a href="javascript:;">&nbsp;</a>
                        </div>

                        <div className="timeline-body">
                          <div className="timeline-header">
                            <span className="userimage">
                              <img src={UserImg} alt="" />
                            </span>
                            <span className="username">
                              <a href="javascript:;">dean</a> <small></small>
                            </span>
                            <span className="pull-right text-muted">
                              18 Views
                            </span>
                          </div>
                          <div className="timeline-content">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Nunc faucibus turpis quis tincidunt luctus.
                              Nam sagittis dui in nunc consequat, in imperdiet
                              nunc sagittis.
                            </p>
                          </div>
                          <div className="timeline-likes">
                            <div className="stats-right">
                              <span className="stats-text">259 Shares</span>
                            </div>
                            <div className="stats">
                              <span className="fa-stack fa-fw stats-icon">
                                <i className="fa fa-circle fa-stack-2x text-danger"></i>
                                <i className="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
                              </span>
                              <span className="fa-stack fa-fw stats-icon">
                                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                                <i className="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                              </span>
                              <span className="stats-total">4.3k</span>
                            </div>
                          </div>
                          <div className="timeline-footer">
                            <a
                              href="javascript:;"
                              className="m-r-15 text-inverse-lighter"
                            >
                              <i className="fa fa-heart fa-fw fa-lg m-r-3"></i>
                              favorite
                            </a>
                            <a
                              href="javascript:;"
                              className="m-r-15 text-inverse-lighter"
                            >
                              <i className="fa fa-share fa-fw fa-lg m-r-3"></i>{" "}
                              Share
                            </a>
                          </div>
                          <div className="timeline-comment-box"></div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-time">
                          <span className="date">yesterday</span>
                          <span className="time">20:17</span>
                        </div>

                        <div className="timeline-icon">
                          <a href="javascript:;">&nbsp;</a>
                        </div>

                        <div className="timeline-body">
                          <div className="timeline-header">
                            <span className="userimage">
                              <img src={UserImg} alt="" />
                            </span>
                            <span className="username">dean</span>
                            <span className="pull-right text-muted">
                              82 Views
                            </span>
                          </div>
                          <div className="timeline-content">
                            <p>Location: United States</p>
                          </div>
                          <div className="timeline-footer">
                            <a
                              href="javascript:;"
                              className="m-r-15 text-inverse-lighter"
                            >
                              <i className="fa fa-heart fa-fw fa-lg m-r-3"></i>{" "}
                              favorite
                            </a>
                            <a
                              href="javascript:;"
                              className="m-r-15 text-inverse-lighter"
                            >
                              <i className="fa fa-share fa-fw fa-lg m-r-3"></i>{" "}
                              Share
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-time">
                          <span className="date">24 February 2014</span>
                          <span className="time">08:17</span>
                        </div>

                        <div className="timeline-icon">
                          <a href="">&nbsp;</a>
                        </div>

                        <div className="timeline-body">
                          <div className="timeline-header">
                            <span className="userimage">
                              <img src={UserImg} alt="" />
                            </span>
                            <span className="username">dean</span>
                            <span className="pull-right text-muted">
                              1,282 Views
                            </span>
                          </div>
                          <div className="timeline-content">
                            <p className="lead">
                              <i className="fa fa-quote-left fa-fw pull-left"></i>{" "}
                              Quisque sed varius nisl. Nulla facilisi. Phasellus
                              consequat sapien sit amet nibh molestie placerat.
                              Donec nulla quam, ullamcorper ut velit vitae,
                              lobortis condimentum magna. Suspendisse mollis in
                              sem vel mollis.
                              <i className="fa fa-quote-right fa-fw pull-right"></i>
                            </p>
                          </div>
                          <div className="timeline-footer">
                            <a
                              href="javascript:;"
                              className="m-r-15 text-inverse-lighter"
                            >
                              <i className="fa fa-heart fa-fw fa-lg m-r-3"></i>{" "}
                              favorite
                            </a>
                            <a
                              href="javascript:;"
                              className="m-r-15 text-inverse-lighter"
                            >
                              <i className="fa fa-share fa-fw fa-lg m-r-3"></i>{" "}
                              Share
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-time">
                          <span className="date">10 January 2014</span>
                          <span className="time">20:43</span>
                        </div>

                        <div className="timeline-icon">
                          <a href="">&nbsp;</a>
                        </div>

                        <div className="timeline-body">
                          <div className="timeline-header">
                            <span className="userimage">
                              <img src={UserImg} alt="" />
                            </span>
                            <span className="username">dean</span>
                            <span className="pull-right text-muted">
                              1,021,282 Views
                            </span>
                          </div>
                          <div className="timeline-content">
                            <h4 className="template-title">
                              <i className="fa fa-map-marker text-danger fa-fw"></i>{" "}
                              795 Folsom Ave, Suite 600 San Francisco, CA 94107
                            </h4>
                            <p>
                              In hac habitasse platea dictumst. Pellentesque
                              bibendum id sem nec faucibus. Maecenas molestie,
                              augue vel accumsan rutrum, massa mi rutrum odio,
                              id luctus mauris nibh ut leo.
                            </p>
                            <p className="m-t-20">
                              <img
                                src="../assets/img/gallery/gallery-5.jpg"
                                alt=""
                              />
                            </p>
                          </div>
                          <div className="timeline-footer">
                            <a href="" className="m-r-15 text-inverse-lighter">
                              <i className="fa fa-heart fa-fw fa-lg m-r-3"></i>
                              favorite
                            </a>
                            <a href="" className="m-r-15 text-inverse-lighter">
                              <i className="fa fa-share fa-fw fa-lg m-r-3"></i>{" "}
                              Share
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-icon">
                          <a href="">&nbsp;</a>
                        </div>

                        <div className="timeline-body">Loading...</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
