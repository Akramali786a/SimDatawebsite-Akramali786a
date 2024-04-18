
import React from 'react';
import Skeleton from "react-loading-skeleton";

function DetailsArea({data}) {
	// console.log(data)
	return (
		<>
			<div className="details">
				<div className="table overflow-auto">
					<table>
						<tbody>
						<tr>
							<th>Province</th>
							<td>

								{data.Province || <Skeleton height={18} baseColor="#c9d6ff" />}
							</td>
						</tr>

						<tr>
							<th>Division</th>
							<td>
								{/*<Skeleton height={18} baseColor="#c9d6ff" />*/}
								{data.Division || <Skeleton height={18} baseColor="#c9d6ff" />}
							</td>

						</tr>

						<tr>
							<th>District</th>
							<td>
								{/*<Skeleton height={18} baseColor="#c9d6ff" />*/}
								{data.District || <Skeleton height={18} baseColor="#c9d6ff" />}
							</td>
						</tr>

						<tr>
							<th>Tehsil</th>
							<td>
								{/*<Skeleton*/}
								{/*	height={18}*/}
								{/*	baseColor="#c9d6ff"*/}
								{/*	count={1}*/}
								{/*/>*/}
								{data.Tehsil || <Skeleton height={18} baseColor="#c9d6ff" />}
							</td>
						</tr>
						<tr>
							<th>Council</th>
							<td>
								{/*<Skeleton*/}
								{/*	height={18}*/}
								{/*	baseColor="#c9d6ff"*/}
								{/*	count={1}*/}
								{/*/>*/}
								{data.Council || <Skeleton height={18} baseColor="#c9d6ff" />}
							</td>
						</tr>
						<tr>
							<th>Gender</th>
							<td>
								{/*<Skeleton*/}
								{/*	height={18}*/}
								{/*	baseColor="#c9d6ff"*/}
								{/*	count={1}*/}
								{/*/>*/}
								{data.Gender || <Skeleton height={18} baseColor="#c9d6ff" />}
							</td>
						</tr>
						</tbody>

					</table>
				</div>
			</div>
		</>
	);
}

export default DetailsArea;