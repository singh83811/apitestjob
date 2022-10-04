import React, { Component } from 'react'
import ReservationService from '../services/ReservationService'

class ListReservationsComponent extends Component
{
	constructor ( props )
	{
		super( props )

		this.state = {
			reservations: []
		}
	}

	componentDidMount ()
	{
		ReservationService.getReservations().then( ( res ) =>
		{
			this.setState( { reservations: res.data.data } );
			console.log( res.data.data, "check data" )
		} );
	}

	render ()
	{
		return (
			<div className='container-fluid'>
				<h2 className="text-center">Reservations List</h2>
				<br></br>
				<div className="row">
					<table className="table table-striped table-bordered">

						<thead>
							<tr>
								<th> LISTING'S NICKNAME</th>
								<th> CHECK IN</th>
								<th> CHECK OUT</th>
								<th> NIGHTS</th>
								<th> GUESTS NAME</th>
								<th> SOURCE</th>
								<th> CREATION DATE</th>
								<th> NET INCOME</th>
								<th> CONF DATE</th>
								<th> ACCOMM FARE</th>
								<th> CLEAN FARE</th>
								<th> TAX</th>
								<th> ADJ</th>
								<th> DISC</th>
								<th> CNCL FEE</th>
								<th> HOST FEE</th>
								<th> BALANCE DUE</th>
								<th> TOTAL PAID</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.reservations.map(
									reservation =>
										<tr key={ reservation.id }>
											<td> { reservation.listing.nickname }</td>
											<td> { reservation.checkIn } </td>
											<td> { reservation.checkOut }</td>
											<td> { reservation.nightsCount }</td>
											<td> { reservation.guest.fullName }</td>
											<td> { reservation.source }</td>
											<td> { reservation.createdAt }</td>
											<td> { reservation.money.netIncome }</td>
											<td> { reservation.confirmedAt }</td>
											<td> { reservation.money.fareAccommodation }</td>
											<td> { reservation.money.fareCleaning }</td>
											<td> { reservation.money.transientOccupancyTax }</td>
											<td> { reservation.money.fareAccommodationAdjusted }</td>
											<td> { reservation.money.fareAccommodationDiscount }</td>
											<td> { reservation.money.fareCleaning }</td>
											<td> { reservation.money.hostServiceFee }</td>
											<td> { reservation.money.balanceDue }</td>
											<td> { reservation.money.totalPaid }</td>
										</tr>
								)
							}
						</tbody>
					</table>

				</div>

			</div>
		)
	}
}

export default ListReservationsComponent